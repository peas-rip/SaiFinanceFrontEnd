import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useToast } from "@/hooks/use-toast";
import { BACKEND_URL } from "@/config";
import { FileText, ArrowLeft } from "lucide-react";
import saiLogo from "@/assets/sai-logo.png";

/* ---------------- Schema ---------------- */
const formSchema = z.object({
  name: z.string().min(2),
  phoneNumber: z.string().min(10),
  primaryContactNumber: z.string().min(10),
  dateOfBirth: z.string().min(1),
  gender: z.string().min(1),
  loanCategory: z.string().min(1),
  loanCategoryOther: z.string().optional(),

  // Address (structured)
  doorNo: z.string().optional(),
  houseName: z.string().optional(),
  village: z.string().min(2, "Village is required"),
  district: z.string().min(2, "District is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().min(5, "Pincode is required"),

  // Referral (optional)
 referralName1: z.string().min(2, "Referral name 1 is required"),
referralPhone1: z.string().min(10, "Referral phone 1 is required"),
referralName2: z.string().min(2, "Referral name 2 is required"),
referralPhone2: z.string().min(10, "Referral phone 2 is required"),

});

export default function LoanForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showOtherField, setShowOtherField] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      primaryContactNumber: "",
      dateOfBirth: "",
      gender: "",
      loanCategory: "",
      loanCategoryOther: "",

      doorNo: "",
      houseName: "",
      village: "",
      district: "",
      state: "",
      pincode: "",

      referralName1: "",
      referralPhone1: "",
      referralName2: "",
      referralPhone2: "",

    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Handle "Other" loan category
    if (values.loanCategory === "other" && values.loanCategoryOther) {
      values.loanCategory = values.loanCategoryOther;
    }

    // ✅ Concatenate address
    const addressParts = [
      values.doorNo && `Door No: ${values.doorNo}`,
      values.houseName && `House: ${values.houseName}`,
      `Village: ${values.village}`,
      `District: ${values.district}`,
      `State: ${values.state}`,
      `Pincode: ${values.pincode}`,
    ].filter(Boolean);

    const payload: any = {
      ...values,
      address: addressParts.join(", "),
    };

    // Remove address sub-fields
    delete payload.doorNo;
    delete payload.houseName;
    delete payload.village;
    delete payload.district;
    delete payload.state;
    delete payload.pincode;

    try {
      const res = await fetch(`${BACKEND_URL}/application/formsubmit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
    } catch {
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
      <header className="border-b bg-card/50 backdrop-blur sticky top-0 z-50">
        <div
          className="container mx-auto px-4 py-4 flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={saiLogo} className="h-12 w-12 object-contain" />
          <div>
            <h1 className="text-xl font-bold">Sri Sai Financial Services</h1>
            <p className="text-xs text-muted-foreground">
              Your Trusted Financial Partner
            </p>
          </div>
        </div>
      </header>

      <div className="container max-w-3xl mx-auto py-12 px-4">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Button>

        <Card className="shadow-xl border-2">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-primary to-accent p-4 rounded-2xl shadow-lg">
                <FileText className="h-12 w-12 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold">
              Loan Application Form
            </CardTitle>
            <CardDescription>Fill in your details</CardDescription>
          </CardHeader>

          <CardContent className="pt-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                {/* Name */}
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* Phone */}
                <FormField control={form.control} name="phoneNumber" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* Primary Contact */}
                <FormField control={form.control} name="primaryContactNumber" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Contact Number *</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* DOB & Gender */}
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="dateOfBirth" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth *</FormLabel>
                      <FormControl><Input type="date" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="gender" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                {/* Loan Category */}
                <FormField control={form.control} name="loanCategory" render={({ field }) => (
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
                        <SelectTrigger>
                          <SelectValue placeholder="Select loan category" />
                        </SelectTrigger>
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
                )} />

                {showOtherField && (
                  <FormField control={form.control} name="loanCategoryOther" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specify Loan Category *</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                )}

                {/* Address */}
                <div className="border-t pt-6 mt-6">
                  <h3 className="text-lg font-semibold mb-4 text-muted-foreground">
                    Address Details
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    {["doorNo","houseName","village","district","state","pincode"].map((name) => (
                      <FormField
                        key={name}
                        control={form.control}
                        name={name as any}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="capitalize">
                              {name.replace(/([A-Z])/g, " $1")}
                              {["village","district","state","pincode"].includes(name) && " *"}
                            </FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </div>

                {/* Referral */}
                <div className="border-t pt-6 mt-6">
  <h3 className="text-lg font-semibold mb-4 text-muted-foreground">
    Referral Information
  </h3>

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


                <Button type="submit" variant="finance" size="lg" className="w-full">
                  Submit Application
                </Button>

              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
