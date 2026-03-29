const defaultAvatarSrc =
  'https://www.figma.com/api/mcp/asset/e2839c42-f24f-4119-9a4b-42ef5c687faa';
const defaultBackgroundSrc =
  'https://www.figma.com/api/mcp/asset/f8a8fc89-203d-4252-9264-7cf63a612abc';

function resolveMediaUrl(
  media: { url?: string; formats?: Record<string, { url?: string }> } | null | undefined,
  origin: string,
) {
  const rawUrl = media?.formats?.large?.url ?? media?.formats?.medium?.url ?? media?.url;

  if (!rawUrl) {
    return null;
  }

  return rawUrl.startsWith('http') ? rawUrl : new URL(rawUrl, origin).toString();
}

export default {
  async find(ctx) {
    const profile = await strapi.db.query('api::profile.profile').findOne({
      populate: ['links', 'avatar', 'background', 'darkBackground'],
    });

    if (!profile) {
      ctx.body = {
        data: null,
      };
      return;
    }

    ctx.body = {
      data: {
        backgroundSrc:
          resolveMediaUrl(profile.background, ctx.request.origin) ?? defaultBackgroundSrc,
        darkBackgroundSrc:
          resolveMediaUrl(profile.darkBackground, ctx.request.origin) ??
          resolveMediaUrl(profile.background, ctx.request.origin) ??
          defaultBackgroundSrc,
        lightBackgroundSrc:
          resolveMediaUrl(profile.background, ctx.request.origin) ?? defaultBackgroundSrc,
        profile: {
          avatarSrc:
            resolveMediaUrl(profile.avatar, ctx.request.origin) ?? defaultAvatarSrc,
          bio: profile.bio,
          initialLiked: profile.initialLiked,
          links: (profile.links || []).map((link) => ({
            id: link.linkId,
            label: link.label,
            href: link.href,
            icon: link.icon,
          })),
          name: profile.name,
        },
      },
    };
  },
};
