package cricket.merstham.website.frontend.controller;

import com.apollographql.apollo.api.Response;
import cricket.merstham.website.frontend.model.RegistrationAction;
import cricket.merstham.website.frontend.model.RegistrationBasket;
import cricket.merstham.website.frontend.model.Subscription;
import cricket.merstham.website.frontend.service.GraphService;
import cricket.merstham.website.graph.MembershipCategoriesQuery;
import cricket.merstham.website.graph.type.StringFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.view.RedirectView;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Controller
@SessionAttributes("basket")
@PreAuthorize("isAuthenticated()")
public class RegistrationController {
    private static final Logger LOG = LoggerFactory.getLogger(RegistrationController.class);

    private GraphService graphService;

    @Autowired
    public RegistrationController(GraphService graphService) {
        this.graphService = graphService;
    }

    @ModelAttribute("basket")
    public RegistrationBasket createRegistrationBasket() {
        LOG.info("Creating new registration basket");
        return new RegistrationBasket();
    }

    @RequestMapping(value = "/register", name = "register", method = RequestMethod.GET)
    public ModelAndView register(
            @ModelAttribute("basket") RegistrationBasket basket) {
        return new ModelAndView(
                "registration/register",
                Map.of("basket", basket)
        );
    }

    @RequestMapping(
            value = "/register",
            name = "registration-actions",
            method = RequestMethod.POST)
    public Object actionProcessor(
            @ModelAttribute("basket") RegistrationBasket basket,
            @ModelAttribute("action") String action,
            @ModelAttribute("delete-member") String deleteMember,
            @ModelAttribute("edit-member") String editMember
    ) throws IOException {
        if (!deleteMember.isBlank()) {
            basket.removeSuscription(UUID.fromString(deleteMember));
        } else if (!editMember.isBlank()) {
            Subscription subscription = basket.getSubscriptions().get(UUID.fromString(editMember));
            return new ModelAndView(
                    "registration/select-membership",
                    Map.of(
                            "categories", graphService.getMembershipCategories(),
                            "subscription", subscription)
            );
        } else {
            switch (action) {
                case "add-member":
                    Subscription subscription = new Subscription();
                    subscription
                            .setUuid(UUID.randomUUID())
                            .setAction(RegistrationAction.NEW)
                            .setMember(new HashMap<>());
                    basket.addSubscription(subscription);
                    return new ModelAndView(
                            "registration/select-membership",
                            Map.of(
                                    "categories", graphService.getMembershipCategories(),
                                    "subscription", subscription)
                    );
            }
        }
        return new RedirectView("/register");
    }

    @RequestMapping(value = "/register/select-membership", name = "member-details", method = RequestMethod.POST)
    public ModelAndView membershipForm(
            @ModelAttribute("basket") RegistrationBasket basket,
            @ModelAttribute("subscription") Subscription subscription
    ) {
        MembershipCategoriesQuery.MembershipCategory membershipCategory = graphService.getMembershipCategory(subscription.getCategory());
        MembershipCategoriesQuery.PricelistItem pricelistItem = membershipCategory
                .pricelistItem()
                .stream().filter(p -> p.id() == subscription.getPricelistItemId())
                .findFirst()
                .orElseThrow();

        subscription
                .setPricelistItemId(pricelistItem.id())
                .setPrice(BigDecimal.valueOf(pricelistItem.currentPrice()))
                .updateDefinition(membershipCategory);

        return new ModelAndView(
                "registration/membership-form",
                Map.of(
                        "form", membershipCategory.form(),
                        "subscription", basket.updateSubscription(subscription)
                )
        );
    }

    @RequestMapping(value = "/register/add-member", name = "member-details", method = RequestMethod.POST)
    public View membershipFormProcess(
            @ModelAttribute("basket") RegistrationBasket basket,
            @ModelAttribute("subscription") Subscription subscription
    ) {
        basket.updateSubscription(subscription);

        return new RedirectView("/register");
    }
}
