import type { Metadata } from "next";
import {
  Bagel_Fat_One,
  Bricolage_Grotesque,
  DM_Serif_Display,
  Geist,
  JetBrains_Mono,
  Silkscreen,
} from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

const bagel = Bagel_Fat_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bagel",
});

const silkscreen = Silkscreen({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-silkscreen",
});

export const metadata: Metadata = {
  title: "ConTrack",
  description: "Track materials, suppliers and stock movement across your sites.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={`${geist.variable} ${bricolage.variable} ${dmSerif.variable} ${jetbrains.variable} ${bagel.variable} ${silkscreen.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
