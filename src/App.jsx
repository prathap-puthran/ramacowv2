import { useState } from "react";
import bgimage from "./assets/bgimage.png";
import audio from "./assets/ramacow.mp3";
import { createClient } from "@supabase/supabase-js";

function App() {
	const [count, setCount] = useState('loading..');

	setTimeout(() => {
		document.getElementById("audio").play();
	}, 3000);
	const supabase = createClient(
		"https://gozkwgquywjlfwjfrrhb.supabase.co",
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdvemt3Z3F1eXdqbGZ3amZycmhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYwMTMwNTcsImV4cCI6MjAzMTU4OTA1N30.aNRVVZuP9EmwFqqo_X6NHwTaC2XbZK6ckXBWeDFu9eg"
	);

	// Function to call the decrement_remaining function
	async function callDecrementFunction() {
		supabase
			.from("count")
			.select()
			.single()
			.limit(1)
			.then(({ data }) => {
				setCount(data.remaining);
				supabase
					.from("count")
					.upsert({ id: data.id, remaining: data.remaining - 1 }).then((data)=>{
            console.log(data);
          })
			});
	}

	const [sankalp, setSankalp] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		try {
			// Insert form data into the 'form_submissions' table
			const { data, error } = await supabase
				.from("form-submissions")
				.insert({ name, email });

			if (error) {
				throw error;
			}

			console.log("Form submitted successfully:", data);
			// Optionally, reset form fields after successful submission
			setName("");
			setEmail("");
			setSubmitted(true); // Update state to indicate form submission
		} catch (error) {
			console.error("Error submitting form:", error.message);
		}
	};

	const sharePage = (platform) => {
		const pageUrl = window.location.href;
		const message = "Join me in protecting Mother cow. Take the pledge!";

		if (navigator.share) {
			navigator.share({
				title: "Protect Mother Cow",
				text: message,
				url: pageUrl
			});
		} else {
			let shareUrl;
			switch (platform) {
				case "facebook":
					shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
					break;
				case "twitter":
					shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
						message
					)}&url=${pageUrl}`;
					break;
				case "whatsapp":
					shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
						message
					)} ${pageUrl}`;
					break;
				default:
					shareUrl = "";
			}
			window.open(shareUrl, "_blank");
		}
	};

	return (
		<>
			<div className="background">
				<img src={bgimage} alt="Background" />
				<audio loop autoPlay={true} id="audio">
					<source src={audio} type="audio/ogg" />
					<source src={audio} type="audio/mpeg" />
					Your browser does not support the audio element.
				</audio>

				{!sankalp ? (
					<div className="formdiv">
						<div>
							<input type="checkbox" id="oath" name="oath" value="oath" />
							<label htmlFor="oath">
								I hereby promise that I will not support any political party
								that kills Mother cow and I will do everything to protect Mother
								cow
							</label>
						</div>

						<button
							onClick={() => {
								setSankalp(true);
								callDecrementFunction(); // Call decrement function when taking Sankalp
							}}>
							Take Sankalp
						</button>
					</div>
				) : (
					<div className="step2">
						<h2>
							{count} <span>Remaining</span>
						</h2>
						{!submitted ? (
							<div className="form-container">
								<form onSubmit={handleFormSubmit} className="contact-form">
									<h2>Please Enter your Contact Info</h2>
									<label htmlFor="name">Name</label>
									<input
										type="text"
										id="name"
										name="name"
										value={name}
										onChange={(e) => setName(e.target.value)}
										required
									/>

									<label htmlFor="email">Email</label>
									<input
										type="email"
										id="email"
										name="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
									/>

									<button type="submit">Submit</button>
								</form>
							</div>
						) : (
							<div className="spread-the-word">
								<h2>Thank you for your support!</h2>
								<p>Spread the word and help us protect Mother cow.</p>
								<p>Share on social media:</p>
								<div className="social-buttons">
									<button onClick={() => sharePage("facebook")}>
										Facebook
									</button>
									<button onClick={() => sharePage("twitter")}>Twitter</button>
									<button onClick={() => sharePage("whatsapp")}>
										WhatsApp
									</button>
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		</>
	);
}

export default App;
