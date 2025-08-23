import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Logo from "./ui/Logo";
import { Link } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useRegisterMutation } from "@/redux/features/authApi/AuthApi";


 
const formSchema = z.object({
    name:z.string().min(3,{message:'name should be at least 3 character'}), 
  email: z.email({message:'please provide a valid email'}),
  password:z.string().min(8,{message:'password should be in 8 character'}),
  role:z.enum(["user","agent"],{message:'please select account type'})
})

const Signup = () => {
    const [register]=useRegisterMutation()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    name:'',
    role:'user',
    email: "",
    password:''
    },
  })
async  function onSubmit(values: z.infer<typeof formSchema>) {
try {
  const res = await register(values).unwrap()
  console.log(res)
} catch (error) {
    console.log(error)
}
  }


  return (
    <section className="bg-muted h-screen">
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-6 lg:justify-start">
          {/* Logo */}
          <p className="flex items-center gap-2" >
        <Logo></Logo><span className="text-xl font-medium">E-Wallet.com</span>
          </p>
          <div className="min-w-sm border-muted bg-background flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md border px-6 py-8 shadow-md">
         <h1 className="text-xl font-semibold">Create Account</h1>
         <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
        
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input  placeholder="john Doe" {...field} />
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
         <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Type </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="agent">Agent Account</SelectItem>
                  <SelectItem value="user">User Account</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription className="sr-only">
              
             user role define here
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">sign up</Button>
      </form>
    </Form>
            
          </div>
          <div className="text-muted-foreground flex justify-center gap-1 text-sm">
            <p>Already have a account ? </p>
            <Link
            
            to={'/login'}
              
              className="text-primary font-medium hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Signup   };
