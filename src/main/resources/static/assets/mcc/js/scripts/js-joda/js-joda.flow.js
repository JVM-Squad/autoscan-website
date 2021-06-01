/**
 * Flowtype definitions for js-joda
 * Generated by Flowgen from a Typescript Definition
 * Flowgen v1.2.0
 * Author: [Joar Wilk](http://twitter.com/joarwilk)
 * Repo: http://github.com/joarwilk/flowgen
 */

declare module "js-joda" {
    declare class TemporalAccessor {
        get(field: TemporalField): number;
        query(query: TemporalQuery): any;
        range(field: TemporalField): ValueRange
    }

    declare class Temporal mixins TemporalAccessor {
    }

    declare class Clock {
        fixed(fixedInstant: Instant, zoneOffset: ZoneOffset): Clock;
        system(zone: ZoneId): Clock;
        systemDefaultZone(): Clock;
        systemUTC(): Clock;
        instant(): Instant;
        millis(): number;
        zone(): any
    }

    declare class DayOfWeek mixins Temporal {
        MONDAY: DayOfWeek;
        TUESDAY: DayOfWeek;
        WEDNESDAY: DayOfWeek;
        THURSDAY: DayOfWeek;
        FRIDAY: DayOfWeek;
        SATURDAY: DayOfWeek;
        SUNDAY: DayOfWeek;
        from(temporal: TemporalAccessor): DayOfWeek; of(dayOfWeek: number): DayOfWeek;
        valueOf(name: string): DayOfWeek;
        values(): DayOfWeek[];
        adjustInto(temporal: TemporalAdjuster): this;
        equals(other: any): boolean;
        getDisplayName(style: TextStyle, locale: Locale): string;
        getLong(field: TemporalField): number;
        isSupported(field: TemporalField): boolean;
        minus(days: number): DayOfWeek;
        name(): string;
        ordinal(): number;
        plus(days: number): DayOfWeek;
        toString(): string;
        value(): number
    }

    declare class TemporalAmount {
        addTo<T>(temporal: T): T;
        get(unit: TemporalUnit): number;
        units(): TemporalUnit[];
        subtractFrom<T>(temporal: T): T
    }

    declare class Duration mixins TemporalAmount {
        ZERO: Duration;
        between(startInclusive: Temporal, endExclusive: Temporal): Duration;
        from(amount: TemporalAmount): Duration; of(amount: number, unit: TemporalUnit): Duration;
        ofDays(days: number): Duration;
        ofHours(hours: number): Duration;
        ofMillis(millis: number): Duration;
        ofMinutes(minutes: number): Duration;
        ofNanos(nanos: number): Duration;
        ofSeconds(seconds: number): Duration;
        parse(text: string): Duration;
        abs(): Duration;
        addTo<T>(temporal: T): T;
        compareTo(otherDuration: Duration): number;
        dividedBy(divisor: number): Duration;
        equals(otherDuration: any): boolean;
        get(unit: TemporalUnit): number;
        isNegative(): boolean;
        isZero(): boolean;
        minus(durationOrNumber: Duration | number, unit: ChronoUnit): Duration;
        minusAmountUnit(amountToSubtract: number, unit: TemporalUnit): Duration;
        minusDays(daysToSubtract: number): Duration;
        minusDuration(duration: Duration): Duration;
        minusHours(hoursToSubtract: number): Duration;
        minusMillis(millisToSubtract: number): Duration;
        minusMinutes(minutesToSubtract: number): Duration;
        minusNanos(nanosToSubtract: number): Duration;
        minusSeconds(secondsToSubtract: number): Duration;
        multipliedBy(multiplicand: number): Duration;
        nano(): number;
        negated(): Duration;
        plus(
            durationOrNumber: Duration | number,
            unitOrNumber: TemporalUnit | number): Duration;
        plusAmountUnit(amountToAdd: number, unit: TemporalUnit): Duration;
        plusDays(daysToAdd: number): Duration;
        plusDuration(duration: Duration): Duration;
        plusHours(hoursToAdd: number): Duration;
        plusMillis(millisToAdd: number): Duration;
        plusMinutes(minutesToAdd: number): Duration;
        plusNanos(nanosToAdd: number): Duration;
        plusSeconds(secondsToAdd: number): Duration;
        plusSecondsNanos(secondsToAdd: number, nanosToAdd: number): Duration;
        seconds(): number;
        subtractFrom<T>(temporal: T): T;
        toDays(): number;
        toHours(): number;
        toJSON(): string;
        toMillis(): number;
        toMinutes(): number;
        toNanos(): number;
        toString(): string;
        units(): any;
        withNanos(nanoOfSecond: number): Duration;
        withSeconds(seconds: number): Duration
    }

    declare class Instant mixins Temporal {
        EPOCH: Instant;
        MIN: Instant;
        MAX: Instant;
        MIN_SECONDS: Instant;
        MAX_SECONDS: Instant;
        from(temporal: TemporalAccessor): Instant;
        now(clock?: Clock): Instant;
        ofEpochMilli(epochMilli: number): Instant;
        ofEpochSecond(epochSecond: number, nanoAdjustment?: number): Instant;
        parse(text: string): Instant;
        adjustInto(temporal: Temporal): Temporal;
        compareTo(otherInstant: Instant): number;
        epochSecond(): number;
        equals(otherInstant: any): boolean;
        get(field: TemporalField): number;
        getLong(field: TemporalField): number;
        hashCode(): number;
        isAfter(otherInstant: Instant): boolean;
        isBefore(otherInstant: Instant): boolean;
        isSupported(fieldOrUnit: TemporalField | TemporalUnit): boolean;
        minus(amount: TemporalAmount): Instant;
        minus(amountToSubtract: number, unit: TemporalUnit): Instant;
        minusMillis(millisToSubtract: number): Instant;
        minusNanos(nanosToSubtract: number): Instant;
        minusSeconds(secondsToSubtract: number): Instant;
        nano(): number;
        plus(amount: TemporalAmount): Instant;
        plus(amountToAdd: number, unit: TemporalUnit): Instant;
        plusMillis(millisToAdd: number): Instant;
        plusNanos(nanosToAdd: number): Instant;
        plusSeconds(secondsToAdd: number): Instant;
        query(query: TemporalQuery): any;
        range(field: TemporalField): ValueRange;
        toEpochMilli(): number;
        toString(): string;
        truncatedTo(unit: TemporalUnit): Instant;
        until(endExclusive: Temporal, unit: TemporalUnit): number;
        with(adjuster: TemporalAdjuster): Instant;
        with(field: TemporalField, newValue: number): Instant;
        withTemporalAdjuster(adjuster: TemporalAdjuster): Instant
    }

    declare class ResolverStyle {
        STRICT: ResolverStyle;
        SMART: ResolverStyle;
        LENIENT: ResolverStyle
    }

    declare class DateTimeFormatter {
        ISO_LOCAL_DATE: DateTimeFormatter;
        ISO_LOCAL_TIME: DateTimeFormatter;
        ISO_LOCAL_DATE_TIME: DateTimeFormatter;
        ISO_INSTANT: DateTimeFormatter;
        ISO_OFFSET_DATE_TIME: DateTimeFormatter;
        ISO_ZONED_DATE_TIME: DateTimeFormatter;
        ofPattern(pattern: string): DateTimeFormatter;
        parsedExcessDays(): TemporalQuery;
        parsedLeapSecond(): boolean;
        chronology(): any;
        decimalStyle(): any;
        format(temporal: TemporalAccessor): string;
        locale(): any;
        parse(text: string, type: TemporalQuery): TemporalAccessor;
        parse1(text: string): TemporalAccessor;
        parse2(text: any, type: any): any;
        parseUnresolved(text: any, position: any): any;
        toString(): string;
        withChronology(chrono: any): any;
        withLocale(locale: Locale): DateTimeFormatter;
        withResolverStyle(resolverStyle: ResolverStyle): DateTimeFormatter
    }

    declare class DateTimeFormatterBuilder {
        constructor(): this;
        append(formatter: DateTimeFormatter): DateTimeFormatterBuilder;
        appendFraction(
            field: TemporalField,
            minWidth: number,
            maxWidth: number,
            decimalPoint: boolean): DateTimeFormatterBuilder;
        appendInstant(fractionalDigits: number): DateTimeFormatterBuilder;
        appendLiteral(literal: any): DateTimeFormatterBuilder;
        appendOffset(pattern: string, noOffsetText: string): DateTimeFormatterBuilder;
        appendOffsetId(): DateTimeFormatterBuilder;
        appendPattern(pattern: string): DateTimeFormatterBuilder;
        appendValue(): DateTimeFormatterBuilder;
        appendValueReduced(): DateTimeFormatterBuilder;
        appendZoneId(): DateTimeFormatterBuilder;
        optionalEnd(): DateTimeFormatterBuilder;
        optionalStart(): DateTimeFormatterBuilder;
        padNext(): DateTimeFormatterBuilder;
        parseCaseInsensitive(): DateTimeFormatterBuilder;
        parseCaseSensitive(): DateTimeFormatterBuilder;
        parseLenient(): DateTimeFormatterBuilder;
        parseStrict(): DateTimeFormatterBuilder;
        toFormatter(resolverStyle: ResolverStyle): DateTimeFormatter
    }

    declare class Chronology {
    }

    declare class LocalTime mixins Temporal {
        MIN: LocalTime;
        MAX: LocalTime;
        MIDNIGHT: LocalTime;
        NOON: LocalTime;
        HOURS_PER_DAY: number;
        MINUTES_PER_HOUR: number;
        MINUTES_PER_DAY: number;
        SECONDS_PER_MINUTE: number;
        SECONDS_PER_HOUR: number;
        SECONDS_PER_DAY: number;
        MILLIS_PER_DAY: number;
        MICROS_PER_DAY: number;
        NANOS_PER_SECOND: number;
        NANOS_PER_MINUTE: number;
        NANOS_PER_HOUR: number;
        NANOS_PER_DAY: number;
        from(temporal: TemporalAccessor): LocalTime;
        now(clockOrZone?: Clock | ZoneId): LocalTime; of(
            hour?: number,
            minute?: number,
            second?: number,
            nanoOfSecond?: number): LocalTime;
        ofInstant(instant: Instant, zone?: ZoneId): LocalTime;
        ofNanoOfDay(nanoOfDay: number): LocalTime;
        ofSecondOfDay(secondOfDay?: number, nanoOfSecond?: number): LocalTime;
        parse(text: String, formatter?: DateTimeFormatter): LocalTime;
        adjustInto(temporal: TemporalAdjuster): Temporal;
        atDate(date: LocalDate): LocalDateTime;
        compareTo(other: LocalTime): number;
        equals(other: any): boolean;
        format(formatter: DateTimeFormatter): string;
        get(field: ChronoField): number;
        getLong(field: ChronoField): number;
        hashCode(): number;
        hour(): number;
        isAfter(other: LocalTime): boolean;
        isBefore(other: LocalTime): boolean;
        isSupported(fieldOrUnit: ChronoField | ChronoUnit): boolean;
        minus(amount: TemporalAmount): LocalTime;
        minus(amountToSubtract: number, unit: ChronoUnit): LocalTime;
        minusHours(hoursToSubtract: number): LocalTime;
        minusMinutes(minutesToSubtract: number): LocalTime;
        minusNanos(nanosToSubtract: number): LocalTime;
        minusSeconds(secondsToSubtract: number): LocalTime;
        minute(): number;
        nano(): number;
        plus(amount: TemporalAmount): LocalTime;
        plus(amountToAdd: number, unit: TemporalUnit): LocalTime;
        plusHours(hoursToAdd: number): LocalTime;
        plusMinutes(minutesToAdd: number): LocalTime;
        plusNanos(nanosToAdd: number): LocalTime;
        plusSeconds(secondstoAdd: number): LocalTime;
        query(query: TemporalQuery): any;
        range(field: ChronoField): ValueRange;
        second(): number;
        toJSON(): string;
        toNanoOfDay(): number;
        toSecondOfDay(): number;
        toString(): string;
        truncatedTo(unit: ChronoUnit): LocalTime;
        until(endExclusive: TemporalAccessor, unit: TemporalUnit): number;
        with(adjuster: TemporalAdjuster): LocalTime;
        with(field: TemporalField, newValue: number): LocalTime;
        withHour(hour: number): LocalTime;
        withMinute(minute: number): LocalTime;
        withNano(nanoOfSecond: number): LocalTime;
        withSecond(second: number): LocalTime;
        withTemporalAdjuster(adjuster: TemporalAdjuster): LocalTime
    }

    declare class MathUtil {
        compareNumbers(a: number, b: number): number;
        floorDiv(x: number, y: number): number;
        floorMod(x: number, y: number): number;
        intDiv(x: number, y: number): number;
        intMod(x: number, y: number): number;
        parseInt(value: number): number;
        roundDown(r: number): number;
        safeAdd(x: number, y: number): number;
        safeMultiply(x: number, y: number): number;
        safeSubtract(x: number, y: number): number;
        safeToInt(value: number): number;
        safeZero(value: number): number;
        verifyInt(value: number): void
    }

    declare class Month mixins Temporal {
        JANUARY: Month;
        FEBRUARY: Month;
        MARCH: Month;
        APRIL: Month;
        MAY: Month;
        JUNE: Month;
        JULY: Month;
        AUGUST: Month;
        SEPTEMBER: Month;
        OCTOBER: Month;
        NOVEMBER: Month;
        DECEMBER: Month;
        from(temporal: TemporalAccessor): Month; of(month: number): Month;
        values(): Month[];
        adjustInto(temporal: Temporal): Temporal;
        firstDayOfYear(leapYear: boolean): number;
        firstMonthOfQuarter(): Month;
        get(field: TemporalField): number;
        getDisplayName(style: TextStyle, locale: Locale): string;
        getLong(field: TemporalField): number;
        isSupported(field: TemporalField): boolean;
        length(leapYear: boolean): number;
        maxLength(): number;
        minLength(): number;
        minus(months: number): Month;
        plus(months: number): Month;
        query(query: TemporalQuery): any;
        toString(): string;
        value(): number
    }

    declare class MonthDay mixins Temporal {
        from(temporal: TemporalAccessor): MonthDay;
        now(arg1?: ZoneId | Clock): MonthDay; of(monthOrNumber: Month | number, number?: number): MonthDay;
        ofMonthNumber(month: Month, dayOfMonth: number): MonthDay;
        ofNumberNumber(month: number, dayOfMonth: number): MonthDay;
        parse(text: string, formatter?: DateTimeFormatter): MonthDay;
        parseString(text: string): MonthDay;
        parseStringFormatter(text: string, formatter: DateTimeFormatter): MonthDay;
        adjustInto(temporal: Temporal): Temporal;
        atYear(year: number): LocalDate;
        compareTo(other: MonthDay): number;
        dayOfMonth(): number;
        equals(obj: any): boolean;
        format(formatter: DateTimeFormatter): string;
        get(field: TemporalField): number;
        getLong(field: TemporalField): number;
        isAfter(other: MonthDay): boolean;
        isBefore(other: MonthDay): boolean;
        isSupported(field: TemporalField): boolean;
        isValidYear(year: number): boolean;
        month(): Month;
        monthValue(): number;
        query(query: TemporalQuery): any;
        range(field: TemporalField): ValueRange;
        toString(): string;
        with(month: Month): MonthDay;
        withDayOfMonth(dayOfMonth: number): MonthDay;
        withMonth(month: number): MonthDay
    }

    declare interface TemporalField {
    }

    declare class ChronoField {
        NANO_OF_SECOND: ChronoField;
        NANO_OF_DAY: ChronoField;
        MICRO_OF_SECOND: ChronoField;
        MICRO_OF_DAY: ChronoField;
        MILLI_OF_SECOND: ChronoField;
        MILLI_OF_DAY: ChronoField;
        SECOND_OF_MINUTE: ChronoField;
        SECOND_OF_DAY: ChronoField;
        MINUTE_OF_HOUR: ChronoField;
        MINUTE_OF_DAY: ChronoField;
        HOUR_OF_AMPM: ChronoField;
        CLOCK_HOUR_OF_AMPM: ChronoField;
        HOUR_OF_DAY: ChronoField;
        CLOCK_HOUR_OF_DAY: ChronoField;
        AMPM_OF_DAY: ChronoField;
        DAY_OF_WEEK: ChronoField;
        ALIGNED_DAY_OF_WEEK_IN_MONTH: ChronoField;
        ALIGNED_DAY_OF_WEEK_IN_YEAR: ChronoField;
        DAY_OF_MONTH: ChronoField;
        DAY_OF_YEAR: ChronoField;
        EPOCH_DAY: ChronoField;
        ALIGNED_WEEK_OF_MONTH: ChronoField;
        ALIGNED_WEEK_OF_YEAR: ChronoField;
        MONTH_OF_YEAR: ChronoField;
        PROLEPTIC_MONTH: ChronoField;
        YEAR_OF_ERA: ChronoField;
        YEAR: ChronoField;
        ERA: ChronoField;
        INSTANT_SECONDS: ChronoField;
        OFFSET_SECONDS: ChronoField;
        baseUnit(): number;
        checkValidIntValue(value: number): number;
        checkValidValue(value: number): any;
        displayName(): string;
        equals(other: any): boolean;
        getFrom(temporal: TemporalAccessor): number;
        isDateBased(): boolean;
        isTimeBased(): boolean;
        name(): string;
        range(): ValueRange;
        rangeRefinedBy(temporal: TemporalAccessor): ValueRange;
        rangeUnit(): number;
        toString(): string
    }

    declare class TemporalUnit {
        addTo<T>(temporal: T, amount: number): T;
        between(temporal1: Temporal, temporal2: Temporal): number;
        duration(): Duration;
        isDateBased(): boolean;
        isDurationEstimated(): boolean;
        isSupportedBy(temporal: Temporal): boolean;
        isTimeBased(): boolean
    }

    declare class ChronoUnit mixins TemporalUnit {
        MICROS: ChronoUnit;
        MILLIS: ChronoUnit;
        SECONDS: ChronoUnit;
        MINUTES: ChronoUnit;
        HOURS: ChronoUnit;
        HALF_DAYS: ChronoUnit;
        DAYS: ChronoUnit;
        WEEKS: ChronoUnit;
        MONTHS: ChronoUnit;
        YEARS: ChronoUnit;
        DECADES: ChronoUnit;
        CENTURIES: ChronoUnit;
        MILLENNIA: ChronoUnit;
        ERAS: ChronoUnit;
        FOREVER: ChronoUnit;
        addTo<T>(temporal: T, amount: number): T;
        between(temporal1: Temporal, temporal2: Temporal): number;
        compareTo(other: TemporalUnit): number;
        duration(): Duration;
        isDateBased(): boolean;
        isDurationEstimated(): boolean;
        isSupportedBy(temporal: Temporal): boolean;
        isTimeBased(): boolean;
        toString(): string
    }

    declare class IsoFields {
        DAY_OF_QUARTER: IsoFields;
        QUARTER_OF_YEAR: IsoFields;
        WEEK_OF_WEEK_BASED_YEAR: IsoFields;
        WEEK_BASED_YEAR: IsoFields;
        WEEK_BASED_YEARS: IsoFields;
        QUARTER_YEARS: IsoFields
    }

    declare class ChronoLocalDate mixins Temporal {
        adjustInto(temporal: TemporalAdjuster): this;
        format(formatter: DateTimeFormatter): string;
        isSupported(fieldOrUnit: TemporalField | TemporalUnit): boolean
    }

    declare class LocalDate mixins ChronoLocalDate {
        MIN: LocalDate;
        MAX: LocalDate;
        EPOCH_0: LocalDate;
        from(temporal: TemporalAccessor): LocalDate;
        now(clockOrZone?: Clock | ZoneId): LocalDate; of(year: number, month: Month | number, dayOfMonth: number): LocalDate;
        ofEpochDay(epochDay: number): LocalDate;
        ofInstant(instant: Instant, zoneId?: ZoneId): LocalDate;
        ofYearDay(year: number, dayOfYear: number): LocalDate;
        parse(text: string, formatter?: DateTimeFormatter): LocalDate;
        atStartOfDay(): LocalDateTime;
        atStartOfDay(zone: ZoneId): ZonedDateTime;
        atStartOfDayWithZone(zone: ZoneId): ZonedDateTime;
        atTime(time: LocalTime): LocalDateTime;
        atTime(
            hour: number,
            minute: number,
            second?: number,
            nanoOfSecond?: number): LocalDateTime;
        chronology(): Chronology;
        compareTo(other: LocalDate): number;
        dayOfMonth(): number;
        dayOfWeek(): DayOfWeek;
        dayOfYear(): number;
        equals(otherDate: any): boolean;
        get(field: TemporalField): number;
        getLong(field: TemporalField): number;
        hashCode(): number;
        isAfter(other: LocalDate): boolean;
        isBefore(other: LocalDate): boolean;
        isEqual(other: LocalDate): boolean;
        isLeapYear(): boolean;
        isoWeekOfWeekyear(): number;
        isoWeekyear(): number;
        lengthOfMonth(): number;
        lengthOfYear(): number;
        minus(amount: TemporalAmount): LocalDate;
        minus(amountToSubtract: number, unit: TemporalUnit): LocalDate;
        minusDays(daysToSubtract: number): LocalDate;
        minusMonths(monthsToSubtract: number): LocalDate;
        minusWeeks(weeksToSubtract: number): LocalDate;
        minusYears(yearsToSubtract: number): LocalDate;
        month(): Month;
        monthValue(): number;
        plus(amount: TemporalAmount): LocalDate;
        plus(amountToAdd: number, unit: TemporalUnit): LocalDate;
        plusDays(daysToAdd: number): LocalDate;
        plusMonths(monthsToAdd: number): LocalDate;
        plusWeeks(weeksToAdd: number): LocalDate;
        plusYears(yearsToAdd: number): LocalDate;
        query(query: TemporalQuery): any;
        range(field: TemporalField): ValueRange;
        toEpochDay(): number;
        toJSON(): string;
        toString(): string;
        until(endDate: TemporalAccessor): Period;
        until(endExclusive: TemporalAccessor, unit: TemporalUnit): number;
        with(fieldOrAdjuster: TemporalField, newValue: Number): LocalDate;
        with(adjuster: TemporalAdjuster): LocalDate;
        withDayOfMonth(dayOfMonth: number): LocalDate;
        withDayOfYear(dayOfYear: number): LocalDate;
        withFieldAndValue(field: TemporalField, newValue: number): LocalDate;
        withMonth(month: Month | number): LocalDate;
        withTemporalAdjuster(adjuster: TemporalAdjuster): LocalDate;
        withYear(year: number): LocalDate;
        year(): number
    }

    declare class ChronoLocalDateTime mixins Temporal {
        adjustInto(temporal: any): any;
        chronology(): Chronology;
        toEpochSecond(offset: ZoneOffset): number;
        toInstant(offset: ZoneOffset): Instant
    }

    declare class LocalDateTime mixins ChronoLocalDateTime {
        MIN: LocalDateTime;
        MAX: LocalDateTime;
        from(temporal: TemporalAccessor): LocalDateTime;
        now(clockOrZone?: Clock | ZoneId): LocalDateTime; of(date: LocalDate, time: LocalTime): LocalDateTime; of(
            year?: number,
            month?: Month | number,
            dayOfMonth?: number,
            hour?: number,
            minute?: number,
            second?: number,
            nanoSecond?: number): LocalDateTime;
        ofEpochSecond(epochSecond: number, offset: ZoneOffset): LocalDateTime;
        ofEpochSecond(epochSecond: number, nanoOfSecond: number, offset: ZoneOffset): LocalDateTime;
        ofInstant(instant: Instant, zoneId?: ZoneId): LocalDateTime;
        parse(text: string, formatter?: DateTimeFormatter): LocalDateTime;
        adjustInto(temporal: TemporalAdjuster): LocalDateTime;
        atZone(zone: ZoneId): ZonedDateTime;
        compareTo(other: LocalDateTime): number;
        dayOfMonth(): number;
        dayOfWeek(): DayOfWeek;
        dayOfYear(): number;
        equals(other: any): boolean;
        format(formatter: DateTimeFormatter): string;
        get(field: TemporalField): number;
        getLong(field: TemporalField): number;
        hashCode(): number;
        hour(): number;
        isAfter(other: LocalDateTime): boolean;
        isBefore(other: LocalDateTime): boolean;
        isEqual(other: any): boolean;
        isSupported(fieldOrUnit: TemporalField | TemporalUnit): boolean;
        minus(amount: TemporalAmount): LocalDateTime;
        minus(amountToSubtract: number, unit: TemporalUnit): LocalDateTime;
        minusDays(days: number): LocalDateTime;
        minusHours(hours: number): LocalDateTime;
        minusMinutes(minutes: number): LocalDateTime;
        minusMonths(months: number): LocalDateTime;
        minusNanos(nanos: number): LocalDateTime;
        minusSeconds(seconds: number): LocalDateTime;
        minusTemporalAmount(amount: TemporalAmount): LocalDateTime;
        minusWeeks(weeks: number): LocalDateTime;
        minusYears(years: number): LocalDateTime;
        minute(): number;
        month(): Month;
        monthValue(): number;
        nano(): number;
        plus(amount: TemporalAmount): LocalDateTime;
        plus(amountToAdd: number, unit: TemporalUnit): LocalDateTime;
        plusDays(days: number): LocalDateTime;
        plusHours(hours: number): LocalDateTime;
        plusMinutes(minutes: number): LocalDateTime;
        plusMonths(months: number): LocalDateTime;
        plusNanos(nanos: number): LocalDateTime;
        plusSeconds(seconds: number): LocalDateTime;
        plusTemporalAmount(amount: TemporalAmount): LocalDateTime;
        plusWeeks(weeks: number): LocalDateTime;
        plusYears(years: number): LocalDateTime;
        query(query: TemporalQuery): any;
        range(field: TemporalField): ValueRange;
        second(): number;
        toJSON(): string;
        toLocalDate(): LocalDate;
        toLocalTime(): LocalTime;
        toString(): string;
        truncatedTo(unit: TemporalUnit): LocalDateTime;
        until(endExclusive: Temporal, unit: TemporalUnit): number;
        with(adjuster: TemporalAdjuster): LocalDateTime;
        with(field: TemporalField, newValue: number): LocalDateTime;
        withDayOfMonth(dayOfMonth: number): LocalDateTime;
        withDayOfYear(dayOfYear: number): LocalDateTime;
        withHour(hour: number): LocalDateTime;
        withMinute(minute: number): LocalDateTime;
        withMonth(month: number | Month): LocalDateTime;
        withNano(nanoOfSecond: number): LocalDateTime;
        withSecond(second: number): LocalDateTime;
        withTemporalAdjuster(adjuster: TemporalAdjuster): LocalDateTime;
        withYear(year: number): LocalDateTime;
        year(): number
    }

    declare class OffsetDateTime {
    }

    declare class Period mixins TemporalAmount {
        ZERO: Period;
        between(startDate: LocalDate, endDate: LocalDate): Period;
        create(years: number, months: number, days: number): Duration;
        from(amount: TemporalAmount): Period; of(years: number, months: number, days: number): Period;
        ofDays(days: number): Period;
        ofMonths(months: number): Period;
        ofWeeks(weeks: number): Period;
        ofYears(years: number): Period;
        parse(text: string): Period;
        addTo<T>(temporal: T): T;
        chronology(): IsoChronology;
        days(): number;
        equals(obj: any): boolean;
        get(unit: TemporalUnit): number;
        hashCode(): number;
        isNegative(): boolean;
        isZero(): boolean;
        minus(amountToSubtract: TemporalAmount): Period;
        minusDays(daysToSubtract: number): Period;
        minusMonths(monthsToSubtract: number): Period;
        minusYears(yearsToSubtract: number): Period;
        months(): number;
        multipliedBy(scalar: number): Period;
        negated(): Period;
        normalized(): Period;
        plus(amountToAdd: TemporalAmount): Period;
        plusDays(daysToAdd: number): Period;
        plusMonths(monthsToAdd: number): Period;
        plusYears(yearsToAdd: number): Period;
        subtractFrom<T>(temporal: T): T;
        toJSON(): string;
        toString(): string;
        toTotalMonths(): number;
        units(): ChronoUnit[];
        withDays(days: number): Period;
        withMonths(months: number): Period;
        withYears(years: number): Period;
        years(): number
    }

    declare class TemporalAdjuster {
        adjustInto(temporal: Temporal): Temporal
    }

    declare class TemporalAdjusters {
        dayOfWeekInMonth(ordinal: number, dayOfWeek: DayOfWeek): TemporalAdjuster;
        firstDayOfMonth(): TemporalAdjuster;
        firstDayOfNextMonth(): TemporalAdjuster;
        firstDayOfNextYear(): TemporalAdjuster;
        firstDayOfYear(): TemporalAdjuster;
        firstInMonth(dayOfWeek: DayOfWeek): TemporalAdjuster;
        lastDayOfMonth(): TemporalAdjuster;
        lastDayOfYear(): TemporalAdjuster;
        lastInMonth(dayOfWeek: DayOfWeek): TemporalAdjuster;
        next(dayOfWeek: DayOfWeek): TemporalAdjuster;
        nextOrSame(dayOfWeek: DayOfWeek): TemporalAdjuster;
        previous(dayOfWeek: DayOfWeek): TemporalAdjuster;
        previousOrSame(dayOfWeek: DayOfWeek): TemporalAdjuster
    }

    declare class TemporalQueries {
        chronology(): TemporalQuery;
        localDate(): TemporalQuery;
        localTime(): TemporalQuery;
        offset(): TemporalQuery;
        precision(): TemporalQuery;
        zone(): TemporalQuery;
        zoneId(): TemporalQuery
    }

    declare class TemporalQuery {
        queryFrom(temporal: TemporalAccessor): any
    }

    declare class ValueRange {
        of(min: number, max: number): ValueRange; of(min: number, maxSmallest: number, maxLargest: number): ValueRange; of(
            minSmallest: number,
            minLargest: number,
            maxSmallest: number,
            maxLargest: number): ValueRange;
        checkValidIntValue(value: number, field: TemporalField): number;
        checkValidValue(value: number, field: TemporalField): any;
        equals(other: any): boolean;
        hashCode(): number;
        isFixed(): boolean;
        isIntValue(): boolean;
        isValidIntValue(value: number): boolean;
        isValidValue(value: any): boolean;
        largestMinimum(): number;
        maximum(): number;
        minimum(): number;
        smallestMaximum(): number;
        toString(): string
    }

    declare class Year mixins Temporal {
        MIN_VALUE: number;
        MAX_VALUE: number;
        from(temporal: TemporalAccessor): Year;
        isLeap(year: number): boolean;
        now(zoneIdOrClock?: ZoneId | Clock): Year; of(isoYear: number): Year;
        parse(text: string, formatter?: DateTimeFormatter): Year;
        atMonth(monthOrNumber: Month | number): Year;
        plus(amountOrNumber: TemporalAmount | number, unit?: TemporalUnit): Year;
        minus(amountOrNumber: TemporalAmount | number, unit?: TemporalUnit): Year
    }

    declare class YearMonth mixins Temporal {
        from(temporal: TemporalAccessor): YearMonth;
        now(zoneIdOrClock?: ZoneId | Clock): YearMonth; of(year: number, monthOrNumber: Month | number): YearMonth;
        parse(text: string, formatter?: DateTimeFormatter): YearMonth;
        minus(amount: TemporalAmount): YearMonth;
        minus(amountToSubtract: number, unit: TemporalUnit): YearMonth;
        minusYears(yearsToSubtract: number): YearMonth;
        minusMonths(monthsToSubtract: number): YearMonth;
        plus(amount: TemporalAmount): YearMonth;
        plus(amountToAdd: number, unit: TemporalUnit): YearMonth;
        plusYears(yearsToAdd: number): YearMonth;
        plusMonths(monthsToAdd: number): YearMonth;
        with(adjuster: TemporalAdjuster): YearMonth;
        with(field: TemporalField, value: number): YearMonth;
        withYearMonth(newYear: number, newMonth: number): YearMonth;
        withYear(year: number): YearMonth;
        withMonth(month: number): YearMonth;
        isSupported(fieldOrUnit: TemporalField | ChronoUnit): boolean;
        year(): number;
        monthValue(): number;
        month(): Month;
        isLeapYear(): boolean;
        isValidDay(): boolean;
        lengthOfMonth(): number;
        lengthOfYear(): number;
        atDay(dayOfMonth: number): LocalDate;
        atEndOfMonth(): LocalDate;
        compareTo(other: YearMonth): number;
        isAfter(other: YearMonth): boolean;
        isBefore(other: YearMonth): boolean;
        equals(other: YearMonth): boolean;
        toJSON(): string;
        format(formatter: DateTimeFormatter): string
    }

    declare class ZoneId {
        SYSTEM: ZoneId;
        UTC: ZoneId;
        systemDefault(): ZoneId; of(zoneId: string): ZoneId;
        ofOffset(prefix: string, offset: ZoneOffset): ZoneId;
        from(temporal: TemporalAccessor): ZoneId;
        getAvailableZoneIds(): string[];
        equals(other: any): boolean;
        hashCode(): number;
        id(): string;
        normalized(): ZoneId;
        rules(): ZoneRules;
        toString(): string
    }

    declare class ZoneOffset mixins ZoneId {
        MAX_SECONDS: ZoneOffset;
        UTC: ZoneOffset;
        MIN: ZoneOffset;
        MAX: ZoneOffset; of(offsetId: string): ZoneOffset;
        ofHours(hours: number): ZoneOffset;
        ofHoursMinutes(hours: number, minutes: number): ZoneOffset;
        ofHoursMinutesSeconds(hours: number, minutes: number, seconds: number): ZoneOffset;
        ofTotalMinutes(totalMinutes: number): ZoneOffset;
        ofTotalSeconds(totalSeconds: number): ZoneOffset;
        adjustInto(temporal: Temporal): Temporal;
        compareTo(other: ZoneOffset): number;
        equals(obj: any): boolean;
        get(field: TemporalField): number;
        getLong(field: TemporalField): number;
        hashCode(): number;
        id(): string;
        query(query: TemporalQuery): any;
        rules(): ZoneRules;
        toString(): string;
        totalSeconds(): number
    }

    declare class ZoneRegion mixins ZoneId {
        ofId(zoneId: string): ZoneId;
        id(): string;
        rules(): ZoneRules
    }

    declare class ZoneRules {
        of(offest: ZoneOffset): ZoneRules;
        isFixedOffset(): boolean;
        isValidOffset(localDateTime: LocalDateTime, offset: ZoneOffset): boolean;
        offset(instantOrLocalDateTime: Instant | LocalDateTime): ZoneOffset;
        offsetOfEpochMilli(epochMilli: number): ZoneOffset;
        offsetOfInstant(instant: Instant): ZoneOffset;
        offsetOfLocalDateTime(localDateTime: LocalDateTime): ZoneOffset
    }

    declare class ChronoZonedDateTime mixins Temporal {
        compareTo(other: ChronoZonedDateTime): number;
        equals(other: any): boolean;
        format(formatter: DateTimeFormatter): string;
        isAfter(other: ChronoZonedDateTime): boolean;
        isBefore(other: ChronoZonedDateTime): boolean;
        isEqual(other: ChronoZonedDateTime): boolean;
        query(query: any): any;
        toEpochSecond(): number;
        toInstant(): Instant
    }

    declare class ZonedDateTime mixins ChronoZonedDateTime {
        from(temporal: TemporalAccessor): ZonedDateTime;
        now(clockOrZone?: Clock | ZoneId): ZonedDateTime; of(): any; of(localDateTime: LocalDateTime, zone: ZoneId): ZonedDateTime; of(date: LocalDate, time: LocalTime, zone: ZoneId): ZonedDateTime; of(
            year: number,
            month: number,
            dayOfMonth: number,
            hour: number,
            minute: number,
            second: number,
            nanoOfSecond: number,
            zone: ZoneId): ZonedDateTime;
        ofInstant(): ZonedDateTime;
        ofInstant(instant: Instant, zone: ZoneId): ZonedDateTime;
        ofInstant(localDateTime: LocalDateTime, offset: ZoneOffset, zone: ZoneId): ZonedDateTime;
        ofLocal(
            localDateTime: LocalDateTime,
            zone: ZoneId,
            preferredOffset: ZoneOffset): ZonedDateTime;
        ofStrict(localDateTime: LocalDateTime, offset: ZoneOffset, zone: ZoneId): ZonedDateTime;
        parse(text: string, formatter?: DateTimeFormatter): ZonedDateTime;
        dayOfMonth(): number;
        dayOfWeek(): DayOfWeek;
        dayOfYear(): number;
        equals(other: any): boolean;
        format(formatter: DateTimeFormatter): string;
        get(field: TemporalField): number;
        getLong(field: TemporalField): number;
        hashCode(): number;
        hour(): number;
        isSupported(fieldOrUnit: TemporalField | TemporalUnit): boolean;
        minus(): any;
        minus(amountToSubtract: number, unit: TemporalUnit): ZonedDateTime;
        minusDays(days: number): ZonedDateTime;
        minusHours(hours: number): ZonedDateTime;
        minusMinutes(minutes: number): ZonedDateTime;
        minusMonths(months: number): ZonedDateTime;
        minusNanos(nanos: number): ZonedDateTime;
        minusSeconds(seconds: number): ZonedDateTime;
        minusTemporalAmount(amount: TemporalAmount): ZonedDateTime;
        minusWeeks(weeks: number): ZonedDateTime;
        minusYears(years: number): ZonedDateTime;
        minute(): number;
        month(): Month;
        monthValue(): number;
        nano(): number;
        offset(): any;
        plus(): any;
        plus(amountToAdd: number, unit: TemporalUnit): ZonedDateTime;
        plusDays(days: number): any;
        plusHours(hours: number): ZonedDateTime;
        plusMinutes(minutes: number): ZonedDateTime;
        plusMonths(months: number): ZonedDateTime;
        plusNanos(nanos: number): ZonedDateTime;
        plusSeconds(seconds: number): ZonedDateTime;
        plusTemporalAmount(amount: TemporalAmount): ZonedDateTime;
        plusWeeks(weeks: number): any;
        plusYears(years: number): ZonedDateTime;
        query(query: TemporalQuery): any;
        range(field: TemporalField): ValueRange;
        second(): number;
        toJSON(): string;
        toLocalDate(): LocalDate;
        toLocalDateTime(): LocalDateTime;
        toLocalTime(): LocalTime;
        toOffsetDateTime(): OffsetDateTime;
        toString(): string;
        truncatedTo(unit: TemporalUnit): ZonedDateTime;
        until(endExclusive: Temporal, unit: TemporalUnit): number;
        with(): any;
        with(field: TemporalField, newValue: number): ZonedDateTime;
        withDayOfMonth(dayOfMonth: number): ZonedDateTime;
        withDayOfYear(dayOfYear: number): ZonedDateTime;
        withFixedOffsetZone(): ZonedDateTime;
        withHour(hour: number): ZonedDateTime;
        withMinute(minute: number): ZonedDateTime;
        withMonth(month: number): ZonedDateTime;
        withNano(nanoOfSecond: number): ZonedDateTime;
        withSecond(second: number): ZonedDateTime;
        withTemporalAdjuster(adjuster: TemporalAdjuster): ZonedDateTime;
        withYear(year: number): ZonedDateTime;
        withZoneSameInstant(zone: ZoneId): ZonedDateTime;
        withZoneSameLocal(zone: ZoneId): ZonedDateTime;
        year(): number;
        zone(): ZoneId
    }

    declare class TextStyle {
        asNormal(): TextStyle;
        asStandalone(): TextStyle;
        isStandalone(): boolean
    }

    declare class Locale {
    }

    declare class IsoChronology {
        isLeapYear(prolepticYear: number): boolean;
        resolveDate(fieldValues: any, resolverStyle: any): any;
        equals(other: any): boolean;
        toString(): string
    }

    declare function nativeJs(date: Date | any, zone?: ZoneId): TemporalAccessor

    declare function convert(
        temporal: LocalDate | LocalDateTime | ZonedDateTime,
        zone?: ZoneId): {
        toDate: () => Date,
        toEpochMilli: () => number
    }

    declare function use(plugin: Function): any;
}