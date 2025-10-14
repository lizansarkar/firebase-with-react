import React from "react";
import ContactForm from "./contact-component/ContactForm";
import MagicEffect from "../reuseble-component/MagicEffect";

export default function Contact() {
  return (
    <div>
      <MagicEffect>
        <div className="page-component relative bg-[#000000]">
          <ContactForm></ContactForm>
        </div>
      </MagicEffect>
    </div>
  );
}
