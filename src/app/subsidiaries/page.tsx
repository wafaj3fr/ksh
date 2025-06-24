import { Building2, Briefcase, Globe2, Users, Banknote, Leaf } from "lucide-react";
import PageHero from "../components/UnifiedHero";
import Subsidiaries from "../components/Subsidiaries";

const subsidiaries = [
	{
		name: "QAST",
		desc: " Network services & Information Technology Management Company.",
		icon: <Globe2 className="w-10 h-10 text-[#B49C5B]" />,
		tag: "Technology",
	},
	{
		name: "TAD",
		desc: "Facility Management Services & Integrated Solutions Company.",
		icon: <Building2 className="w-10 h-10 text-[#B49C5B]" />,
		tag: "Facility Management",
	},
	{
		name: "Cubes",
		desc: "Construction & Real estate Company.",
		icon: <Users className="w-10 h-10 text-[#B49C5B]" />,
		tag: "Construction",
	},
	{
		name: "Quality for supply chains",
		desc: "Supply chains management Services Company.",
		icon: <Banknote className="w-10 h-10 text-[#B49C5B]" />,
		tag: "Supply Chains",
	},
];

export default function SubsidiariesPage() {
	return (
		<main className="min-h-screen bg-gradient-to-br from-[#f5f7fa] via-[#f7f9fc] to-[#e7ebf0] text-gray-900 font-sans">
			<PageHero
				title="Our Subsidiaries"
				subtitle="Explore the diverse companies under the Kuwaiti Sudanese Holding Company, each contributing to Sudan's growth and development."
				image="/herobg.jpg"
				
			/>
			<section className="px-6 sm:px-20 pt-32 pb-20">
				<div className="max-w-6xl mx-auto">
					<h1 className="text-4xl font-extrabold text-primary mb-2 text-center">
						Our Subsidiaries
					</h1>
					<div className="w-24 h-1 bg-[#B49C5B] rounded mb-8 mx-auto" />
					<p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto text-center mb-16">
						Each of our subsidiaries is a leader in its field, working together to
						build a stronger, more innovative Sudan. Explore our group companies
						and their unique contributions.
					</p>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
						{subsidiaries.map((sub, i) => (
							<div
								key={i}
								className="relative bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center border border-[#B49C5B] hover:scale-105 hover:shadow-2xl transition-all duration-300"
							>
								<div className="absolute -top-4 right-6 bg-[#B49C5B]/90 text-white text-xs px-3 py-1 rounded-full shadow font-semibold tracking-wide">
									{sub.tag}
								</div>
								<div className="bg-primary/10 rounded-full p-4 mb-4 flex items-center justify-center">
									{sub.icon}
								</div>
								<h3 className="text-lg font-bold text-primary mb-2">
									{sub.name}
								</h3>
								<p className="text-sm text-gray-700 leading-relaxed mb-2">
									{sub.desc}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>
			{/* QAST info Section */}
			<section className="bg-white py-20">
				<div className="max-w-6xl mx-auto px-6 sm:px-20">
					<h2 className="text-3xl font-bold text-primary mb-4 text-center">
						QAST - Network Services & IT Management
					</h2>
					<p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto text-center mb-8">
						QAST is dedicated to providing cutting-edge network services and IT
						management solutions, driving innovation and efficiency in Sudan's
						technology landscape.
					</p>
					<div className="flex justify-center">
						<Globe2 className="w-16 h-16 text-[#B49C5B]" />
					</div>
				</div>
			</section>
			{/* TAD info Section */}
			<section className="bg-white py-20">
				<div className="max-w-6xl mx-auto px-6 sm:px-20">
					<h2 className="text-3xl font-bold text-primary mb-4 text-center">
						TAD - Facility Management & Integrated Solutions
					</h2>
					<p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto text-center mb-8">
						TAD specializes in facility management services, providing integrated
						solutions that enhance operational efficiency and sustainability.
					</p>
					<div className="flex justify-center">
						<Building2 className="w-16 h-16 text-[#B49C5B]" />
					</div>
				</div>
			</section>
			{/* Cubes info Section */}
			<section className="bg-white py-20">
				<div className="max-w-6xl mx-auto px-6 sm:px-20">
					<h2 className="text-3xl font-bold text-primary mb-4 text-center">
						Cubes - Construction & Real Estate
					</h2>
					<p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto text-center mb-8">
						Cubes is at the forefront of construction and real estate development,
						building sustainable and innovative structures across Sudan.
					</p>
					<div className="flex justify-center">
						<Users className="w-16 h-16 text-[#B49C5B]" />
					</div>
				</div>
			</section>
			{/* Quality for Supply Chains info Section */}
			<section className="bg-white py-20">
				<div className="max-w-6xl mx-auto px-6 sm:px-20">
					<h2 className="text-3xl font-bold text-primary mb-4 text-center">
						Quality for Supply Chains - Supply Chain Management
					</h2>
					<p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto text-center mb-8">
						Quality for Supply Chains provides comprehensive supply chain management
						solutions, ensuring efficiency and quality in every step of the process.
					</p>
					<div className="flex justify-center">
						<Banknote className="w-16 h-16 text-[#B49C5B]" />
					</div>
				</div>
			</section>
		</main>
	);
}