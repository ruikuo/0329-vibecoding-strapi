import type { Core } from '@strapi/strapi';

const defaultProfile = {
  name: 'Lucy',
  bio: "Hi I'm Luuuuuuuuucy!",
  initialLiked: false,
  links: [
    {
      linkId: 'instagram',
      label: 'Instagram',
      href: 'https://instagram.com',
      icon: 'instagram',
    },
    {
      linkId: 'medium',
      label: 'Medium',
      href: 'https://medium.com',
      icon: 'medium',
    },
    {
      linkId: 'linkedin',
      label: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: 'linkedin',
    },
  ],
};

async function ensureProfileLike(strapi: Core.Strapi) {
  const existingProfileLike = await strapi.documents('api::profile-like.profile-like').findFirst();

  if (!existingProfileLike) {
    await strapi.documents('api::profile-like.profile-like').create({
      data: {
        count: 0,
      },
    });
  }
}

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const existingProfile = await strapi.documents('api::profile.profile').findFirst({
      populate: ['links'],
    });

    if (!existingProfile) {
      await strapi.documents('api::profile.profile').create({
        data: defaultProfile,
      });
    }

    await ensureProfileLike(strapi);
  },
};
