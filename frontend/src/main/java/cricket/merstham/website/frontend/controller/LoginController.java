package cricket.merstham.website.frontend.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import cricket.merstham.website.frontend.RouteNames;
import cricket.merstham.website.frontend.model.UserSignUp;
import cricket.merstham.website.frontend.security.CognitoChallengeAuthentication;
import cricket.merstham.website.frontend.service.CognitoService;
import cricket.merstham.website.frontend.service.QrCodeService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.support.RequestContextUtils;
import org.springframework.web.servlet.view.RedirectView;

import java.util.List;
import java.util.Map;

import static cricket.merstham.website.frontend.controller.HomeController.ROOT_URL;
import static cricket.merstham.website.frontend.helpers.OtpHelper.OTP_CODE_FIELD_PREFIX;
import static cricket.merstham.website.frontend.helpers.OtpHelper.getCodeFromMap;
import static cricket.merstham.website.frontend.helpers.RedirectHelper.redirectTo;
import static java.text.MessageFormat.format;
import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;
import static java.util.Objects.requireNonNull;

@Controller
public class LoginController {

    private static final Logger LOG = LoggerFactory.getLogger(LoginController.class);
    public static final String LOGIN_PROCESSING_URL = "/login";
    public static final String CHALLENGE_PROCESSING_URL = "/login/challenge";
    public static final String LOGIN_URL = "/login";
    public static final String LOGOUT_URL = "/logout";
    public static final String SIGNUP_URL = "/sign-up";
    public static final String VERIFICATION_URL = "/sign-up/verification";
    public static final String PENDING_USER = "pending_user";
    public static final String ERROR_FLASH = "ERROR";
    public static final String ERRORS = "ERRORS";
    public static final String SIGN_UP = "VALUES";
    public static final String SETUP_MFA_APP_URL = "/auth/challenge/setup-mfa/app";
    public static final String SETUP_MFA_SMS_URL = "/auth/challenge/setup-mfa/sms";
    public static final String LOGIN_ERRORS_MESSAGE_CATEGORY = "login.errors.";
    public static final String MODEL_SESSION_ID = "sessionId";
    public static final String MODEL_USER_ID = "userId";
    public static final String MODEL_AUTHENTICATION = "authentication";
    public static final String MODEL_PROCESSING_URL = "processingUrl";
    public static final String MODEL_QR_CODE = "qrCode";
    public static final String MODEL_SECRET = "secret"; // pragma: allowlist secret
    public static final String MODEL_CHALLENGE_NAME = "challengeName";
    public static final String MODEL_MFA_TYPES = "mfaTypes";
    public static final String MODEL_ERRORS = "errors";
    public static final String MODEL_SIGN_UP = "signUp";
    public static final String ROUTE_SIGNUP = "signup";
    private final ObjectMapper objectMapper;
    private final CognitoService cognitoService;
    private final QrCodeService qrCodeService;

    @Autowired
    public LoginController(
            ObjectMapper objectMapper, CognitoService cognitoService, QrCodeService qrCodeService) {
        this.objectMapper = objectMapper;
        this.cognitoService = cognitoService;
        this.qrCodeService = qrCodeService;
    }

    @GetMapping(value = LOGIN_URL, name = RouteNames.ROUTE_LOGIN)
    @PostMapping(value = LOGIN_PROCESSING_URL)
    public ModelAndView login(@RequestParam(value = "error", required = false) String error) {
        var errors =
                isNull(error) ? List.of() : List.of(LOGIN_ERRORS_MESSAGE_CATEGORY.concat(error));
        return new ModelAndView(
                "login/login",
                Map.of(
                        MODEL_PROCESSING_URL, LOGIN_PROCESSING_URL,
                        MODEL_ERRORS, errors),
                isNull(error) ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    }

    @GetMapping(value = "/auth/challenge/{type}", name = RouteNames.ROUTE_CHALLENGE)
    @PreAuthorize("hasRole('ROLE_PRE_AUTH')")
    public ModelAndView challenge(
            @PathVariable String type, CognitoChallengeAuthentication authentication) {
        List<String> errors =
                authentication.getError() == null
                        ? List.of()
                        : List.of(
                                LOGIN_ERRORS_MESSAGE_CATEGORY.concat(
                                        authentication.getError().getCode()));
        var challenge = authentication.getChallengeName().toString();
        LOG.info(
                "Issuing challenge: name = {}, step = {}, errors = [{}]",
                challenge,
                authentication.getStep(),
                String.join(", ", errors));
        var mfaTypes = getMfaTypes(authentication);
        return new ModelAndView(
                format("login/challenge-{0}", type),
                Map.of(
                        MODEL_PROCESSING_URL, CHALLENGE_PROCESSING_URL,
                        MODEL_SESSION_ID, authentication.getSessionId(),
                        MODEL_USER_ID, authentication.getPrincipal(),
                        MODEL_AUTHENTICATION, authentication,
                        MODEL_ERRORS, errors,
                        MODEL_CHALLENGE_NAME, challenge,
                        MODEL_MFA_TYPES, mfaTypes));
    }

    @GetMapping(value = SETUP_MFA_APP_URL, name = RouteNames.ROUTE_SETUP_MFA_APP)
    @PreAuthorize("hasRole('ROLE_PRE_AUTH')")
    public ModelAndView mfaAppSetup(CognitoChallengeAuthentication authentication) {
        var credentials = (Map<String, Object>) authentication.getCredentials();
        var qrCode =
                qrCodeService.getTotpSecretQrCode(
                        (String) credentials.get("SOFTWARE_TOKEN_MFA_CODE"),
                        authentication.getEmail());

        return new ModelAndView(
                "login/setup-mfa-app",
                Map.of(
                        MODEL_PROCESSING_URL,
                        CHALLENGE_PROCESSING_URL,
                        MODEL_SESSION_ID,
                        authentication.getSessionId(),
                        MODEL_USER_ID,
                        authentication.getPrincipal(),
                        MODEL_AUTHENTICATION,
                        authentication,
                        MODEL_QR_CODE,
                        qrCode,
                        MODEL_SECRET,
                        authentication.getCredentials()));
    }

    @GetMapping(value = SETUP_MFA_SMS_URL, name = RouteNames.ROUTE_SETUP_MFA_SMS)
    @PreAuthorize("hasRole('ROLE_PRE_AUTH')")
    public ModelAndView mfaSmsSetup(CognitoChallengeAuthentication authentication) {
        return new ModelAndView(
                "login/setup-mfa-sms",
                Map.of(
                        MODEL_PROCESSING_URL,
                        CHALLENGE_PROCESSING_URL,
                        MODEL_SESSION_ID,
                        authentication.getSessionId(),
                        MODEL_USER_ID,
                        authentication.getPrincipal(),
                        MODEL_AUTHENTICATION,
                        authentication));
    }

    @GetMapping(value = SIGNUP_URL, name = ROUTE_SIGNUP)
    public ModelAndView signup(HttpServletRequest request) {
        var model = Map.<String, Object>of();
        var flash = RequestContextUtils.getInputFlashMap(request);
        if (nonNull(flash)) {
            var errors = flash.get(ERRORS);
            var signUp = flash.get(SIGN_UP);
            model = Map.of(MODEL_ERRORS, errors, MODEL_SIGN_UP, signUp);
        }
        return new ModelAndView("login/signup", model);
    }

    @PostMapping(value = SIGNUP_URL, name = RouteNames.ROUTE_SIGNUP_PROCESS)
    public RedirectView signupProcess(
            @Valid UserSignUp signUp, Errors errors, RedirectAttributes redirectAttributes) {
        if (errors.hasErrors()) {
            redirectAttributes.addFlashAttribute(ERRORS, errors.getAllErrors());
            redirectAttributes.addFlashAttribute(SIGN_UP, signUp);

            return redirectTo(SIGNUP_URL);
        }
        var pendingUser = cognitoService.register(signUp);
        redirectAttributes.addFlashAttribute(PENDING_USER, pendingUser);

        return redirectTo(VERIFICATION_URL);
    }

    @GetMapping(value = VERIFICATION_URL, name = RouteNames.ROUTE_VERIFICATION)
    public ModelAndView verification(HttpServletRequest request) {
        var flash = requireNonNull(RequestContextUtils.getInputFlashMap(request));
        var pendingUser = flash.get(PENDING_USER);
        return new ModelAndView("login/verification", Map.of("pendingUser", pendingUser));
    }

    @PostMapping(value = VERIFICATION_URL, name = RouteNames.ROUTE_VERIFICATION_PROCESS)
    public RedirectView verificationProcess(@RequestParam Map<String, String> parameters) {
        var userId = parameters.get(MODEL_USER_ID);
        var code = getCodeFromMap(parameters, OTP_CODE_FIELD_PREFIX);
        if (cognitoService.verify(userId, code)) {
            return redirectTo(ROOT_URL);
        }
        return redirectTo(SIGNUP_URL);
    }

    @GetMapping(value = LOGOUT_URL, name = RouteNames.ROUTE_LOGOUT)
    public RedirectView logout(HttpServletRequest request) throws ServletException {
        LOG.info("Logging out");
        request.logout();
        return redirectTo(ROOT_URL);
    }

    private List<String> getMfaTypes(CognitoChallengeAuthentication authentication) {
        try {
            return objectMapper.readValue(
                    authentication.getAllowedMfaTypes(), new TypeReference<>() {});
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
