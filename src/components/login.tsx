import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Logo from "./ui/Logo";
import { Link, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useLoginMutation } from "@/redux/features/authApi/AuthApi";
import { toast } from "sonner";


 
const formSchema = z.object({
  email: z.email({message:'please provide a valid email'}),
  password:z.string().min(8,{message:'password should be in 8 character'})
})

const Login = () => {
  const [login]=useLoginMutation()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    email: "",
    password:''
    },
  })

const handleLoginTerms = async (values: z.infer<typeof formSchema>)=>{
  try {
    const res = await login(values).unwrap()
    toast.success('login successfully')
    navigate('/')
    console.log(res)
  } catch (error:any) {
    console.log(error)
    toast.error(error?.data?.message)
  }
}

  const navigate = useNavigate()
 async function onSubmit(values: z.infer<typeof formSchema>) {
try {
  const res = await login(values).unwrap()
  toast.success('login successfully')
  navigate('/')
  console.log(res)
} catch (error:any) {
  console.log(error)
  toast.error(error?.data?.message)
}
  }


  return (
    <section style={{
      backgroundImage:`url(https://i.pinimg.com/736x/8a/29/e7/8a29e7f4bad8c9b41d21390f0f7925bb.jpg)`,
      
    }} className="min-h-screen bg-cover bg-center">
      <div className="flex h-full  items-center justify-center">
        <div className="flex flex-col mt-16  items-center gap-6 justify-center">
          {/* Logo */}
          <p className="flex items-center gap-2" >
        <Logo></Logo><span className="text-xl font-medium">E-Wallet.com</span>
          </p>
          <div className="min-w-sm bg-white/5 backdrop-blur-lg flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md  px-6 py-8 shadow-md">
         <h1 className="text-xl font-semibold">Login Now</h1>
         <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
        
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input  placeholder="john@gmail.com" {...field} />
              </FormControl>
              <FormDescription className="sr-only">
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input placeholder="**********" {...field} />
              </FormControl>
              <FormDescription className="sr-only">
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full text-white bg-muted/50" type="submit">Login</Button>
      </form>
    </Form>
      <div className="flex justify-between gap-5">
        <Button onClick={()=>handleLoginTerms({email : "agent1@gmail.com",password:"12345678"})} className="bg-muted/50 text-white">Login as agent</Button>
        <Button onClick={()=>handleLoginTerms({email : "admin@gmail.com",password:"12345678"})} className="bg-muted/50 text-white">Login as Admin</Button>
      </div>
            
          </div>
          <div className="text-gray-300 flex justify-center gap-1 text-sm">
            <p>don't have a account ? </p>
            <Link
            
            to={'/signup'}
              
              className="text-primary  font-medium hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Login  };
