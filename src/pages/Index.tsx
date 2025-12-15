import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { FileText, Phone, Instagram, MapPin, Mail } from "lucide-react";

import { motion } from "framer-motion";
import saiLogo from "@/assets/sai-logo.png";

export default function Index() {
  const navigate = useNavigate();

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-4
      bg-gradient-to-br from-blue-100 via-slate-50 to-orange-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 4, ease: "easeOut" }}
    >
      <div className="max-w-2xl w-full space-y-8">

        {/* Header */}
        <motion.div
          className="flex items-center justify-center gap-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <img
            src={saiLogo}
            alt="Sai Financial Services"
            className="h-16 w-16 object-contain"
          />
          <h1 className="text-3xl font-bold text-foreground">
            Sri Sai Financial Services
          </h1>
        </motion.div>

        {/* Apply for Loan Card */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          <Card
            className="bg-white/95 backdrop-blur shadow-xl
            hover:shadow-2xl transition-shadow cursor-pointer"
            onClick={() => navigate("/loan-form")}
          >
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-200 p-4 rounded-full">
                  <FileText className="h-12 w-12 text-blue-700" />
                </div>
              </div>
              <CardTitle className="text-2xl">Apply for Loan</CardTitle>
              <CardDescription>
                Submit your loan application
              </CardDescription>
            </CardHeader>

            <CardContent className="text-center">
              <p className="text-muted-foreground mb-6">
                Fill out our simple form to enquire about personal, housing,
                business, or vehicle loans, and our team will contact you shortly.
              </p>
              <Button size="lg" className="w-full">
                Start Application
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Us */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-white/95 backdrop-blur shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Contact Us</CardTitle>
              <CardDescription>
                Reach out for loan assistance or queries
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Phone */}
              <div className="flex items-center gap-3">
                <div className="bg-blue-200 p-2 rounded-full">
                  <Phone className="h-5 w-5 text-blue-700" />
                </div>
                <a
                  href="tel:+919876543210"
                  className="font-medium hover:text-blue-700 transition-colors"
                >
                  +91  8660871116
                </a>
              </div>
              <div className="flex items-center gap-3">
  <div className="bg-blue-200 p-2 rounded-full">
    <Mail className="h-5 w-5 text-blue-700" />
  </div>
  <a
    href="mailto:srisai.financialservices@gmail.com"
    className="font-medium hover:text-blue-700 transition-colors"
  >
    srisai.financialservices@gmail.com
  </a>
</div>
              {/* Instagram */}
              <div className="flex items-center gap-3">
                <div className="bg-blue-200 p-2 rounded-full">
                  <Instagram className="h-5 w-5 text-blue-700" />
                </div>
                <a
                  href="https://www.instagram.com/srisai_financial_services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:text-blue-700 transition-colors"
                >
                  @srisai_financial_services
                </a>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="bg-blue-200 p-2 rounded-full mt-1">
                  <MapPin className="h-5 w-5 text-blue-700" />
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Sri Sai Financial Services<br />
                  Main Road, Bangalore<br />
                  Karnataka – 5600XX
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

      </div>
    </motion.div>
  );
}
