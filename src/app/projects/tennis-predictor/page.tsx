import type { Metadata } from "next";
import TennisCaseStudy from "@/components/tennis-case-study";

export const metadata: Metadata = {
  title: "ATP Tennis Predictor — Machine Learning Case Study",
  description:
    "A leakage-safe ATP match prediction system using chronological feature engineering, walk-forward validation and a stacked machine-learning ensemble.",
  alternates: { canonical: "/projects/tennis-predictor/" },
  openGraph: {
    title: "ATP Tennis Predictor — Machine Learning Case Study",
    description:
      "From historical ATP data to strictly future match probabilities: data, features, model comparison and recorded results.",
    url: "/projects/tennis-predictor/",
  },
};

export default function TennisPredictorPage() {
  return <TennisCaseStudy />;
}
