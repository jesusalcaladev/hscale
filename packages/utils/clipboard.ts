export const copyToClipboard = (
	value: string,
	onSuccess: () => void,
	onError: (error: Error) => void,
) => {
	navigator.clipboard
		.writeText(value)
		.then(() => {
			onSuccess();
		})
		.catch((error) => {
			if (error instanceof Error) {
				onError(error);
			}
		});
};
