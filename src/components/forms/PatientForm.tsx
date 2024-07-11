"use client";

import { Form } from "@/components/ui/form";
import { createUser } from "@/lib/actions/patient.action";
import { UserFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomFormField from "../CustomFormField";
import SubmitBtn from "../SubmitBtn";
import { toast, useToast } from "@/components/ui/use-toast"


export enum FormFieldType{
  INPUT='input',
  CHECKBOX='checkbox',
  TEXTAREA='textarea',
  PHONE_INPUT='phoneInput',
  DATE_PICKER='datePicker',
  SELECT='select',
  SKELETON='skeleton'
}



export function PatientForm() {

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit({name, email, phone}: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);

    try {
      const userData = {
        name, email, phone
      }
     const user = await createUser(userData)
     if(user === undefined) {
      toast({
        title: "User already exists with this phone number",
      
      })
     }
     if(user) router.push(`/patients/${user.$id}/register`)
    } catch (error) {
      console.log(error)
    }

    setIsLoading(false)
    
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there👋</h1>
          <p className="text-dark-700">Schedule your first appointment</p>
        </section>

        <CustomFormField
        fieldType={FormFieldType.INPUT}
        control = {form.control} 
        name="name"
        label="Full name"
        placeholder="John Doe"
        iconSrc="/assets/icons/user.svg"
        iconAlt="user"

       />
        <CustomFormField
        fieldType={FormFieldType.INPUT}
        control = {form.control} 
        name="email"
        label="Email"
        placeholder="johndoe@gmail.com"
        iconSrc="/assets/icons/email.svg"
        iconAlt="email"

       />
        <CustomFormField
        fieldType={FormFieldType.PHONE_INPUT}
        control = {form.control} 
        name="phone"
        label="Phone Number"
        placeholder="00000 00000"
      

       />
      <SubmitBtn isLoading={isLoading}>Get Started</SubmitBtn>
      </form>
    </Form>
  );
}
