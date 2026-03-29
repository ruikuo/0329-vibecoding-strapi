const uid = 'api::profile-like.profile-like';

async function ensureProfileLike() {
  const existing = await strapi.documents(uid).findFirst();

  if (existing) {
    return existing;
  }

  return strapi.documents(uid).create({
    data: {
      count: 0,
    },
  });
}

export default {
  async find(ctx) {
    const profileLike = await ensureProfileLike();

    ctx.body = {
      data: {
        count: profileLike.count ?? 0,
      },
    };
  },

  async increment(ctx) {
    const profileLike = await ensureProfileLike();
    const nextCount = (profileLike.count ?? 0) + 1;

    await strapi.documents(uid).update({
      documentId: profileLike.documentId,
      data: {
        count: nextCount,
      },
    });

    ctx.body = {
      data: {
        count: nextCount,
      },
    };
  },
};
