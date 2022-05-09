package cricket.merstham.graphql.services;

import cricket.merstham.graphql.entity.MemberAttributeEntity;
import cricket.merstham.graphql.entity.MemberAttributeEntityId;
import cricket.merstham.graphql.entity.MemberEntity;
import cricket.merstham.graphql.entity.MemberSubscriptionEntity;
import cricket.merstham.graphql.entity.MemberSubscriptionEntityId;
import cricket.merstham.graphql.entity.OrderEntity;
import cricket.merstham.graphql.entity.PaymentEntity;
import cricket.merstham.graphql.inputs.MemberInput;
import cricket.merstham.graphql.inputs.PaymentInput;
import cricket.merstham.graphql.inputs.where.MemberCategoryWhereInput;
import cricket.merstham.graphql.repository.AttributeDefinitionEntityRepository;
import cricket.merstham.graphql.repository.MemberCategoryEntityRepository;
import cricket.merstham.graphql.repository.MemberEntityRepository;
import cricket.merstham.graphql.repository.OrderEntityRepository;
import cricket.merstham.graphql.repository.PaymentEntityRepository;
import cricket.merstham.shared.dto.AttributeDefinition;
import cricket.merstham.shared.dto.Member;
import cricket.merstham.shared.dto.MemberCategory;
import cricket.merstham.shared.dto.Order;
import cricket.merstham.shared.dto.Payment;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Component;

import java.security.Principal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoField;
import java.util.List;
import java.util.stream.Collectors;

import static cricket.merstham.graphql.helpers.UserHelper.getSubject;
import static java.util.Objects.isNull;

@Component
public class MembershipService {

    private final AttributeDefinitionEntityRepository attributeRepository;
    private final MemberEntityRepository memberRepository;
    private final MemberCategoryEntityRepository memberCategoryEntityRepository;
    private final OrderEntityRepository orderEntityRepository;
    private final PaymentEntityRepository paymentEntityRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public MembershipService(
            AttributeDefinitionEntityRepository attributeRepository,
            MemberEntityRepository memberRepository,
            MemberCategoryEntityRepository memberCategoryEntityRepository,
            OrderEntityRepository orderEntityRepository,
            PaymentEntityRepository paymentEntityRepository,
            ModelMapper modelMapper) {
        this.attributeRepository = attributeRepository;
        this.memberRepository = memberRepository;
        this.memberCategoryEntityRepository = memberCategoryEntityRepository;
        this.orderEntityRepository = orderEntityRepository;
        this.paymentEntityRepository = paymentEntityRepository;
        this.modelMapper = modelMapper;
    }

    public List<AttributeDefinition> getAttributes() {
        return attributeRepository.findAll().stream()
                .map(a -> modelMapper.map(a, AttributeDefinition.class))
                .collect(Collectors.toList());
    }

    @PreAuthorize("hasRole('ROLE_MEMBERSHIP')")
    public List<Member> getMembers() {
        var members = memberRepository.findAll();
        return members.stream()
                .map(m -> modelMapper.map(m, Member.class))
                .collect(Collectors.toList());
    }

    public List<MemberCategory> getCategories(MemberCategoryWhereInput where) {
        var categories = memberCategoryEntityRepository.findAll();
        return categories.stream()
                .filter(category -> isNull(where) || where.matches(category))
                .map(c -> modelMapper.map(c, MemberCategory.class))
                .collect(Collectors.toList());
    }

    @PreAuthorize("hasRole('ROLE_MEMBERSHIP')")
    public Member getMember(int id) {
        var member = memberRepository.findById(id);
        return member.map(m -> modelMapper.map(m, Member.class)).orElseThrow();
    }

    @PreAuthorize("hasRole('ROLE_MEMBERSHIP')")
    public List<Order> getOrders(int year) {
        return orderEntityRepository
                .findByCreateDateBetween(LocalDate.of(year, 1, 1), LocalDate.of(year, 12, 31))
                .stream()
                .map(o -> modelMapper.map(o, Order.class))
                .collect(Collectors.toList());
    }

    @PreAuthorize("isAuthenticated()")
    public List<Order> getMyOrders(Principal principal) {
        return orderEntityRepository
                .findByOwnerUserIdAllIgnoreCaseOrderByCreateDateAsc(getSubject(principal))
                .stream()
                .map(o -> modelMapper.map(o, Order.class))
                .collect(Collectors.toList());
    }

    @PreAuthorize("isAuthenticated()")
    public Member createMember(MemberInput data, Principal principal) {
        var now = Instant.now();
        OrderEntity order =
                orderEntityRepository.findById(data.getSubscription().getOrderId()).orElseThrow();
        var member =
                MemberEntity.builder()
                        .registrationDate(now)
                        .ownerUserId(getSubject(principal))
                        .type("member")
                        .attributes(
                                data.getAttributes().stream()
                                        .map(
                                                a ->
                                                        MemberAttributeEntity.builder()
                                                                .primaryKey(
                                                                        MemberAttributeEntityId
                                                                                .builder()
                                                                                .definition(
                                                                                        attributeRepository
                                                                                                .findByKey(
                                                                                                        a
                                                                                                                .getKey()))
                                                                                .build())
                                                                .createdDate(now)
                                                                .updatedDate(now)
                                                                .value(a.getValue())
                                                                .build())
                                        .collect(Collectors.toList()))
                        .subscription(
                                List.of(
                                        MemberSubscriptionEntity.builder()
                                                .addedDate(
                                                        LocalDate.ofInstant(
                                                                now, ZoneId.systemDefault()))
                                                .price(data.getSubscription().getPrice())
                                                .order(order)
                                                .primaryKey(
                                                        MemberSubscriptionEntityId.builder()
                                                                .year(now.get(ChronoField.YEAR))
                                                                .build())
                                                .build()))
                        .build();
        return modelMapper.map(memberRepository.saveAndFlush(member), Member.class);
    }

    @PreAuthorize("isAuthenticated()")
    public Order createOrder(String uuid, Principal principal) {
        var order =
                OrderEntity.builder()
                        .ownerUserId(getSubject(principal))
                        .uuid(uuid)
                        .createDate(LocalDate.now())
                        .build();
        order = orderEntityRepository.saveAndFlush(order);
        return modelMapper.map(order, Order.class);
    }

    @PreAuthorize("isAuthenticated()")
    public Payment addPaymentToOrder(int orderId, PaymentInput payment, Principal principal) {
        OrderEntity order = orderEntityRepository.findById(orderId).orElseThrow();
        return modelMapper.map(
                paymentEntityRepository.saveAndFlush(
                        PaymentEntity.builder()
                                .type(payment.getType())
                                .reference(payment.getReference())
                                .amount(payment.getAmount())
                                .processingFees(payment.getProcessingFees())
                                .date(payment.getDate())
                                .collected(payment.isCollected())
                                .reconciled(payment.isReconciled())
                                .order(order)
                                .build()),
                Payment.class);
    }
}
