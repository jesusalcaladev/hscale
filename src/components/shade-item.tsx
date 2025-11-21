import { useState } from "react";
import type { Shade } from "../types/shade";
import { copyToClipboard } from "../utils/clipboard";
import { generateContrastColor } from "../utils/colors";
import { Copy } from "./icons/copy";
import { AnimatePresence, motion } from "motion/react";
import { CopyCheck } from "./icons/copy-check";

export const ShadeItem = ({ shade }: { shade: Shade }) => {
	const [isHovered, setIsHovered] = useState(false);
	const [isCopied, setIsCopied] = useState(false);

	const handleCopy = () => {
		copyToClipboard(shade.hex, "Color copied to clipboard!");
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 2000);
	};

	return (
		<motion.button
			transition={{
				scale: {
					ease: "easeInOut",
					duration: 0.1,
				},
			}}
			whileHover={{
				scale: 1.05,
			}}
			whileTap={{
				scale: 0.95,
			}}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={handleCopy}
			key={shade.hsl}
			style={{
				backgroundColor: shade.hex,
			}}
			className={`w-[110px] transition-all relative hover:cursor-pointer h-full rounded-xl px-2 py-2 flex flex-col justify-between`}
		>
			<AnimatePresence>
				{isHovered && (
					<motion.div
						exit={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						initial={{ opacity: 0 }}
						className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black/50"
					>
						{!isCopied && (
							<motion.div
								animate={{ scale: 1, opacity: 1 }}
								initial={{ scale: 0, opacity: 0 }}
								exit={{ scale: 0, opacity: 0 }}
							>
								<Copy />
							</motion.div>
						)}
						{isCopied && (
							<motion.div
								animate={{ translateX: 0, opacity: 1 }}
								initial={{ translateX: -100, opacity: 0 }}
								exit={{ translateX: -100, opacity: 0 }}
							>
								<CopyCheck />
							</motion.div>
						)}
					</motion.div>
				)}
			</AnimatePresence>

			<p
				className="font-medium text-sm"
				style={{
					color: generateContrastColor(shade.hex),
				}}
			>
				color-{shade.name}
			</p>
			<p
				className="opacity-60 "
				style={{
					color: generateContrastColor(shade.hex),
				}}
			>
				{shade.hex}
			</p>
		</motion.button>
	);
};
