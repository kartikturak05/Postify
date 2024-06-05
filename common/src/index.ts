import {z} from "zod"

// validation of signup inputs
export const signupInput = z.object({
    email:z.string().email(),
    password:z.string().min(6),
    name : z.string().optional()
  })
  
  // Validation of signin inputs

export const signinInput = z.object({
    email:z.string().email(),
    password:z.string().min(6),
    name : z.string().optional()
})

// Validation on createblog inputs
export const createBlogInputs = z.object({
      title:z.string(),
      content:z.string()
    })
    
    // Validation on createblog inputs
    export const updateBlogInputs = z.object({
        id:z.string(),
        title:z.string(),
        content:z.string()
    })
    

    // exporting types
    export type SignupInput = z.infer<typeof signupInput>
    export type SigninInput = z.infer<typeof signinInput>
    export type CreateBlogInputs = z.infer<typeof createBlogInputs>
    export type UpdateBlogInputs = z.infer<typeof updateBlogInputs>
    