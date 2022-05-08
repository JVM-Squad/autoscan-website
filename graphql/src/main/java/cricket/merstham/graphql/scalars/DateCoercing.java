package cricket.merstham.graphql.scalars;

import graphql.language.StringValue;
import graphql.schema.Coercing;
import graphql.schema.CoercingParseLiteralException;
import graphql.schema.CoercingParseValueException;
import graphql.schema.CoercingSerializeException;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class DateCoercing implements Coercing<LocalDate, String> {
    @Override
    public String serialize(final Object dataFetcherResult) throws CoercingSerializeException {
        if (dataFetcherResult instanceof LocalDate) {
            return DateTimeFormatter.ISO_DATE.format((LocalDate) dataFetcherResult);
        } else {
            throw new CoercingSerializeException("Expected a LocalDate object.");
        }
    }

    @Override
    public LocalDate parseValue(final Object input) throws CoercingParseValueException {
        try {
            if (input instanceof String) {
                return DateTimeFormatter.ISO_DATE.parse((String) input, LocalDate::from);
            } else {
                throw new CoercingParseValueException("Expected a String");
            }
        } catch (DateTimeParseException e) {
            throw new CoercingParseValueException(
                    String.format("Not a valid date: '%s'.", input), e);
        }
    }

    @Override
    public LocalDate parseLiteral(final Object input) throws CoercingParseLiteralException {
        if (input instanceof StringValue) {
            try {
                return LocalDate.parse(((StringValue) input).getValue());
            } catch (DateTimeParseException e) {
                throw new CoercingParseLiteralException(e);
            }
        } else {
            throw new CoercingParseLiteralException("Expected a StringValue.");
        }
    }
}
