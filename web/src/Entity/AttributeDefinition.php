<?php

namespace App\Entity;

use Symfony\Component\Form\Extension\Core\Type\BirthdayType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TimeType;
use Symfony\Component\Form\FormBuilderInterface;

/**
 * Class AttributeDefinition
 * @package App\Entity
 */
class AttributeDefinition
{
    private const STRING_TYPE = "String";
    private const NUMBER_TYPE = "Number";
    private const BOOLEAN_TYPE = "Boolean";
    private const DATE_TYPE = "Date";
    private const TIME_TYPE = "Time";
    private const TIMESTAMP_TYPE = "Timestamp";
    private const LIST_TYPE = "List";
    private const OPTION_TYPE = "Option";
    private const EMAIL_TYPE = "Email";

    /**
     * @var string
     */
    private $key;

    /**
     * @var string
     */
    private $type;

    /**
     * @var array|null
     */
    private $choices;

    /**
     * @return string
     */
    public function getKey(): string
    {
        return $this->key;
    }

    /**
     * @return string
     */
    public function getType(): string
    {
        return $this->type;
    }

    /**
     * @return array|null
     */
    public function getChoices(): ?array
    {
        $values = [];
        foreach ($this->choices as $item) {
            $values[$item] = $item;
        }
        return $values;
    }

    /**
     * @param string $key
     * @return AttributeDefinition
     */
    public function setKey(string $key): AttributeDefinition
    {
        $this->key = $key;
        return $this;
    }

    /**
     * @param string $type
     * @return AttributeDefinition
     */
    public function setType(string $type): AttributeDefinition
    {
        $this->type = $type;
        return $this;
    }

    /**
     * @param array|null $choices
     * @return AttributeDefinition
     */
    public function setChoices(?array $choices): AttributeDefinition
    {
        $this->choices = $choices;
        return $this;
    }

    /**
     * @param FormBuilderInterface $builder
     * @param bool $required
     * @return FormBuilderInterface
     */
    public function createFormComponent(
        FormBuilderInterface $builder,
        bool $required = false
    ): FormBuilderInterface {
        $options = [
            "property_path" => "member[" . $this->getKey() . "]",
            "label" => $this->getKey(),
            "translation_domain" => "membership",
            "required" => $required,
            "help" => $this->getKey() . "-help",
        ];

        switch ($this->getType()) {
            case self::NUMBER_TYPE:
                return $builder->create(
                    $this->getKey(),
                    NumberType::class,
                    array_merge($options, [])
                );
            case self::EMAIL_TYPE:
                return $builder->create(
                    $this->getKey(),
                    EmailType::class,
                    array_merge($options, [])
                );
            case self::BOOLEAN_TYPE:
                return $builder->create(
                    $this->getKey(),
                    CheckboxType::class,
                    array_merge($options, [])
                );
            case self::DATE_TYPE:
                return $builder->create(
                    $this->getKey(),
                    BirthdayType::class,
                    array_merge($options, [])
                );
            case self::TIME_TYPE:
                return $builder->create(
                    $this->getKey(),
                    TimeType::class,
                    array_merge($options, [])
                );
            case self::TIMESTAMP_TYPE:
                return $builder->create(
                    $this->getKey(),
                    DateTimeType::class,
                    array_merge($options, [])
                );
            case self::LIST_TYPE:
                return $builder->create(
                    $this->getKey(),
                    ChoiceType::class,
                    array_merge($options, [
                        "choices" => $this->getChoices(),
                        "multiple" => true,
                        "expanded" => true,
                        "placeholder" => false,
                    ])
                );
            case self::OPTION_TYPE:
                return $builder->create(
                    $this->getKey(),
                    ChoiceType::class,
                    array_merge($options, [
                        "row_attr" => [
                            "class" => "radio-inline",
                        ],
                        "choices" => $this->getChoices(),
                        "multiple" => false,
                        "expanded" => true,
                        "placeholder" => false,
                    ])
                );
            case self::STRING_TYPE:
                return $builder->create(
                    $this->getKey(),
                    TextType::class,
                    array_merge($options, [])
                );
        }
    }
}
