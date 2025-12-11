import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { FileText, ArrowLeft } from "lucide-react";
import { BACKEND_URL } from "@/config";
import { useState } from "react";
import saiLogo from "@/assets/sai-logo.png";

// Schema matching backend fields exactly
const formSchema = z.object({
  name: z.string().min(2),
  phoneNumber: z.string().min(10),
  primaryContactNumber: z.string().min(10),
  address: z.string().min(10),
  dateOfBirth: z.string().min(1),
  gender: z.string().min(1),
  loanCategory: z.string().min(1),
  loanCategoryOther: z.string().optional(),

  referralName1: z.string().min(2),
  referralPhone1: z.string().min(10),
  referralName2: z.string().min(2),
  referralPhone2: z.string().min(10),
});

export default function LoanForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showOtherField, setShowOtherField] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      primaryContactNumber: "",
      address: "",
      dateOfBirth: "",
      gender: "",
      loanCategory: "",
      loanCategoryOther: "",
      referralName1: "",
      referralPhone1: "",
      referralName2: "",
      referralPhone2: "",
    },
  });

  const onSubmit = async (values) => {
    // If user chooses "other", replace loanCategory
    if (values.loanCategory === "other" && values.loanCategoryOther) {
      values.loanCategory = values.loanCategoryOther;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/application`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        toast({
          title: "Submission Failed",
          description: data.message || "Unable to submit application",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Application Submitted",
        description: "Your loan application was submitted successfully!",
      });

      form.reset();
      navigate("/thank-you");

    } catch (err) {
      toast({
        title: "Server Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <img src={saiLogo} className="h-12 w-12 object-contain" />
            <div>
              <h1 className="text-xl font-bold">Sai Financial Services</h1>
              <p className="text-xs text-muted-foreground">Your Trusted Financial Partner</p>
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="container max-w-3xl mx-auto py-12 px-4">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Button>

        <Card className="shadow-xl border-2">
          <CardHeader className="text-center bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-primary to-accent p-4 rounded-2xl shadow-lg">
                <FileText className="h-12 w-12 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold">Loan Application Form</CardTitle>
            <CardDescription>Fill in your details</CardDescription>
          </CardHeader>

          <CardContent className="pt-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number *</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Primary Contact */}
                <FormField
                  control={form.control}
                  name="primaryContactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Contact Number *</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Address */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address *</FormLabel>
                      <FormControl>
                        <Textarea className="min-h-[100px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-6">
                  
                  {/* DOB */}
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth *</FormLabel>
                        <FormControl><Input type="date" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Gender */}
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                </div>

                {/* Loan Category */}
                <FormField
                  control={form.control}
                  name="loanCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loan Category *</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          setShowOtherField(value === "other");
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select loan category" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="personal">Personal Loan</SelectItem>
                          <SelectItem value="housing">Housing Loan</SelectItem>
                          <SelectItem value="business">Business Loan</SelectItem>
                          <SelectItem value="vehicle-old">Vehicle Loan (Old)</SelectItem>
                          <SelectItem value="vehicle-new">Vehicle Loan (New)</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Other Loan Category */}
                {showOtherField && (
                  <FormField
                    control={form.control}
                    name="loanCategoryOther"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Specify Loan Category *</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* Referral Section */}
                <div className="border-t pt-6 mt-6">
                  <h3 className="text-lg font-semibold mb-4">Referral Information</h3>

                  <div className="grid md:grid-cols-2 gap-6">

                    <FormField
                      control={form.control}
                      name="referralName1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Referral Name 1 *</FormLabel>
                          <FormControl><Input {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="referralPhone1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Referral Phone 1 *</FormLabel>
                          <FormControl><Input {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="referralName2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Referral Name 2 *</FormLabel>
                          <FormControl><Input {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="referralPhone2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Referral Phone 2 *</FormLabel>
                          <FormControl><Input {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                  </div>
                </div>

                <Button type="submit" variant="finance" className="w-full" size="lg">
                  Submit Application
                </Button>

              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t bg-muted/50 mt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src={saiLogo} className="h-8 w-8" />
            <span className="font-semibold">Sai Financial Services</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2024 Sai Financial Services. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
