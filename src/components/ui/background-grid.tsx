export const BackgroundGrid = ({ color = "#cbd5e1" }: { color: string }) => {
	return (
		<div className="fixed top-0 left-0 w-full h-full z-10 opacity-5">
			<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
				<defs>
					<pattern
						id="grid"
						width="40"
						height="40"
						patternUnits="userSpaceOnUse"
					>
						<path
							d="M 40 0 L 0 0 0 40"
							fill="none"
							stroke={color}
							strokeWidth="1"
						/>
					</pattern>
				</defs>
				<rect width="100%" height="100%" fill="url(#grid)" />
			</svg>
		</div>
	);
};
