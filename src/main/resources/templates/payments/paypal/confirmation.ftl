<#import "/spring.ftl" as spring />
<#import "../../base.ftl" as layout />
<#import "../../components.ftl" as components />
<@layout.mainLayout formName="membership.confirmation">
    <@components.panel>
        <@components.section title="PayPal">
            <@spring.message code="payments.paypal-confirmation" />
        </@components.section>

        <@components.buttonGroup>
            <a class="btn btn-success btn-xlg transition-3d-hover" href="/">
                <@spring.message code="membership.complete" />
                <i class="fa fa-icon-home"></i>
            </a>
        </@components.buttonGroup>
    </@components.panel>
</@layout.mainLayout>
