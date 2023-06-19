import {
	Box,
	Step,
	StepDescription,
	StepIcon,
	StepIndicator,
	StepNumber,
	StepSeparator,
	StepStatus,
	StepTitle,
	Stepper,
	useBreakpointValue,
	useSteps,
} from '@chakra-ui/react';

const steps = [
	{ title: 'First', description: 'Contact Info' },
	{ title: 'Second', description: 'Date & Time' },
	{ title: 'Third', description: 'Select Rooms' },
];

const OrderPage = () => {
	const isScreenFixed = useBreakpointValue({ base: false, md: true });
	const { activeStep } = useSteps({
		index: 1,
		count: steps.length,
	});

	return (
		<Box marginTop={isScreenFixed ? '12rem' : '0'} mx={5}>
			<Stepper index={activeStep} orientation="vertical" height="400px" gap="0">
				{steps.map((step, index) => (
					<Step key={index}>
						<StepIndicator>
							<StepStatus
								complete={<StepIcon />}
								incomplete={<StepNumber />}
								active={<StepNumber />}
							/>
						</StepIndicator>

						<Box flexShrink="0">
							<StepTitle>{step.title}</StepTitle>
							<StepDescription>{step.description}</StepDescription>
						</Box>

						<StepSeparator />
					</Step>
				))}
			</Stepper>
		</Box>
	);
};

export default OrderPage;
