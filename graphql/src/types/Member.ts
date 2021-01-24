import {inputObjectType, objectType} from "nexus";
import {Context} from "../context";
import {GraphQLResolveInfo} from "graphql";
import {decrypt} from "../helpers/Encryption";


export const Member = objectType({
    name: "Member",
    definition(t) {
        t.model.id();
        t.model.givenName();
        t.model.familyName();
        t.model.gender();
        t.model.registrationDate();
        t.model.attributes();
        t.model.owner();
    },
});

export const MemberAttribute = objectType({
    name: "MemberAttribute",
    async definition(t) {
        t.model.member();
        t.model.definition();
        t.model.createdDate();
        t.model.updatedDate();
        t.model.value({
            resolve: async (root: any, args: any, ctx: Context, info: GraphQLResolveInfo, originalResolver: any) => {
                const { encrypted: data } = await originalResolver(root, args, ctx, info)
                const decrypted = await decrypt(data);
                return JSON.parse(decrypted);
            }
        });
    },
});

export const AttributeDefinition = objectType({
    name: "AttributeDefinition",
    definition(t) {
        t.model.id();
        t.model.key();
        t.model.type();
    }
})

export const MemberInput = inputObjectType({
    name: "MemberInput",
    description: "A definition of a member",
    definition(t) {
        t.field("givenName", { type: "String" });
        t.field("familyName", { type: "String" });
        t.field("gender", { type: "Gender" });
        t.field("registrationDate", { type: "DateTime" });
        t.field("category", { type: "String" });
        t.list.field("attributes", { type: "AttributeInput" });
    }
})

export const AttributeInput = inputObjectType({
    name: "AttributeInput",
    description: "",
    definition(t) {
        t.field("key", { type: "String" });
        t.field("value", { type: "Json" });
    }
});