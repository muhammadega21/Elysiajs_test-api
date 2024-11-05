import { NotFoundError } from 'elysia';
import db from '../../db'

export async function getPosts() {
        try{
            return await db.post.findMany({orderBy: {createdAt:'asc'}})
        }catch  (e:unknown){
            console.error(`error getting posts: ${e}`);
            
        }
}

export async function getPost(id:number) {
    try{
        const post = await db.post.findUnique({where:{id}});
            if(!post){
                throw new NotFoundError('Post not found')
            }

            return post;
    }catch(e:unknown){
        console.error(`error finding post: ${e}`);
    }
}

export async function createPost(option:{title:string,content:string}) {
    try{
        const {title,content} = option;
        return await db.post.create({data:{title,content}})
    }catch(e:unknown){
        console.error(`error creating post: ${e}`);
    }
}

export async function updatePost(id:number,option:{title?:string,content?:string}) {
    try{
        const {title,content} = option;
        return await db.post.update({
            where:{id},
            data:{
                ...(title ? {title} : {}),
                ...(content ? {content} : {})

            }
        })
    }catch(e:unknown){
        console.error(`error creating post: ${e}`);
    }
}

export async function deletePost(option:{id:number}) {
    try{
        const {id} = option;
        return await db.post.delete({ where: { id } });
    }catch(e:unknown){
        console.error(`error delete post: ${e}`);
    }
}