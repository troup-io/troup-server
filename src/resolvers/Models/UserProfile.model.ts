import { objectType } from 'nexus';

export const UserProfile = objectType({
    name: 'UserProfile',
    definition(t) {
        t.model.id();
        t.model.createdAt();
        t.model.updatedAt();
        t.model.firstName();
        t.model.lastName();
        t.model.professionalCompetence();
        t.model.utm_source();
        t.model.utm_campaign();
        t.model.utm_medium();
        t.model.utm_term();
        t.model.utm_content();
    },
});
