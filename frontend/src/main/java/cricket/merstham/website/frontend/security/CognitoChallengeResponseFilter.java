package cricket.merstham.website.frontend.security;

import cricket.merstham.website.frontend.service.CognitoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static cricket.merstham.website.frontend.controller.LoginController.CHALLENGE_PROCESSING_URL;
import static cricket.merstham.website.frontend.helpers.OtpHelper.getCodeFromRequestParameters;
import static cricket.merstham.website.frontend.security.CognitoChallengeAuthentication.Step.SETUP_SMS_MFA;

@Component
public class CognitoChallengeResponseFilter extends AbstractAuthenticationProcessingFilter {

    private static final Logger LOG = LoggerFactory.getLogger(CognitoChallengeResponseFilter.class);
    private static final AntPathRequestMatcher DEFAULT_ANT_PATH_REQUEST_MATCHER = new AntPathRequestMatcher(CHALLENGE_PROCESSING_URL,
            "POST");
    public static final String MFA_TYPE_FIELD = "mfa-type";

    private final CognitoService service;

    public CognitoChallengeResponseFilter(CognitoService service) {
        super(DEFAULT_ANT_PATH_REQUEST_MATCHER);
        this.service = service;
    }

    @Autowired
    public CognitoChallengeResponseFilter(AuthenticationManager authenticationManager, CognitoService service) {
        super(DEFAULT_ANT_PATH_REQUEST_MATCHER, authenticationManager);
        this.service = service;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException, IOException {
        if (!request.getMethod().equals("POST")) {
            throw new AuthenticationServiceException("Authentication method not supported: " + request.getMethod());
        }
        var authentication = (CognitoChallengeAuthentication) SecurityContextHolder.getContext().getAuthentication();
        switch (authentication.getChallengeName()) {
            case MFA_SETUP -> {
                return mfaSetup(request, response, authentication);
            }
            case SOFTWARE_TOKEN_MFA -> {
                return verifySoftwareMfa(request, authentication);
            }
            case SMS_MFA -> {
                return verifySmsMfa(request, authentication);
            }
            case NEW_PASSWORD_REQUIRED -> {
                return handlePasswordChange(request, authentication);
            }
            default -> {
                LOG.error("Unsupported Cognito challenge experienced: {}", authentication.getChallengeName());
                return null;
            }
        }
    }

    private Authentication handlePasswordChange(HttpServletRequest request, CognitoChallengeAuthentication authentication) {
        return null;
    }

    private Authentication verifySmsMfa(HttpServletRequest request, CognitoChallengeAuthentication authentication) {
        var code = getCodeFromRequestParameters(request.getParameterMap());
        return service.verifySmsMfa(authentication, code);
    }

    private Authentication mfaSetup(HttpServletRequest request, HttpServletResponse response, CognitoChallengeAuthentication authentication) throws IOException {
        switch (authentication.getStep()) {
            case DEFAULT -> {
                return chooseMfaType(request, response, authentication);
            }
            case SETUP_SOFTWARE_MFA -> {
                return service.verifyAppSetup(authentication, getCodeFromRequestParameters(request.getParameterMap()));
            }
            case SETUP_SMS_MFA -> {
                return service.setPhoneNumber(authentication, request.getParameter("phoneNumber"));
            }
            case SETUP_SMS_MFA_VERIFY -> {
                return null;
            }
            default -> {
                LOG.error("Unexpected challenge step experienced: {}", authentication.getStep());
                return null;
            }
        }
    }

    private Authentication chooseMfaType(HttpServletRequest request, HttpServletResponse response, CognitoChallengeAuthentication authentication) throws IOException {
        var mfaType = request.getParameter(MFA_TYPE_FIELD);
        switch (mfaType) {
            case "SOFTWARE_TOKEN_MFA" -> {
                return service.getAppToken(authentication);
            }
            case "SMS_MFA" -> {
                return CognitoChallengeAuthentication
                        .builder()
                        .sessionId(authentication.getSessionId())
                        .email(authentication.getEmail())
                        .challengeName(authentication.getChallengeName())
                        .challengeParameters(authentication.getChallengeParameters())
                        .step(SETUP_SMS_MFA)
                        .credentials(authentication.getCredentials())
                        .build();
            }
            default -> {
                LOG.error("Unexpected MFA type in request: {}", mfaType);
                return null;
            }
        }
    }

    private Authentication verifySoftwareMfa(HttpServletRequest request, CognitoChallengeAuthentication authentication) {
        var code = getCodeFromRequestParameters(request.getParameterMap());
        return service.verifySoftwareMfa(authentication, code);
    }
}
