import React, { useState } from "react";

export default function Home({ message }) {
  return (
    <div>
      <h1>{message}</h1>
      <p>This page is rendered with Phoenix + Inertia + React.</p>
    </div>
  );
}