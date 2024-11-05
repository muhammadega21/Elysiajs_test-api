const { PrismaClient } = require("@prisma/client");
const { error } = require("elysia");

const client = new PrismaClient();

const postToCreate = [
  {
    id: 1,
    title: "first post",
    content: "content post 1",
  },
  {
    id: 2,
    title: "post 2",
    content: "content post 2",
  },
  {
    id: 3,
    title: "post 3",
    content: "content post 3",
  },
  {
    id: 4,
    title: "post 4",
    content: "content post 4",
  },
  {
    id: 5,
    title: "post 5",
    content: "content post 5",
  },
];

const seed = async (posts) => {
  console.log("creating post...");

  for (let i = 0; i < posts.length; i++) {
    console.log("creating post: ", posts[i]);

    await client.post.upsert({
      where: { id: posts[i].id },
      update: posts[i],
      create: posts[i],
    });
  }
};

seed(postToCreate)
  .then(() => {
    console.log("created/updated post successfully");
  })
  .catch((error) => {
    console.error("Error:".error);
  })
  .finally(() => {
    client.$disconnect();
    console.log("disconnect prisma client, exiting.");
  });
