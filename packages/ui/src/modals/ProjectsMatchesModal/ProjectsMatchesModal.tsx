import { BatteryStepper, Button, Modal } from "@eden/package-ui";

export interface ProjectsMatchesModalProps {
  openModal?: boolean;
  // eslint-disable-next-line no-unused-vars
  batteryPercentageBefore?: number;
  numMatchesBefore?: number;
  batteryPercentageAfter?: number;
  numMatchesAfter?: number;
  header1?: string;
  header2?: string;
  /*
      This is for the text above and bellow the batery.
      topLeft refers to text above the battery that is on the left side(before AI or battery with bigger number).
  */
  topLeftText?: string;
  bottomLeftText?: string;
  topRightText?: string;
  bottomRightText?: string;

  matchType?: string;
  onSubmit?: () => void;
}

export const ProjectsMatchesModal = ({
  openModal,
  header1 = "Looking for someone?",
  header2 = "Let me help you find them!",
  topLeftText = "We Have",
  bottomLeftText = "active on Eden today.",
  topRightText = "I’ll help you find the",
  bottomRightText = "for you to talk to!",
  matchType = "People",
  batteryPercentageBefore = 10,
  numMatchesBefore = 212,
  batteryPercentageAfter = 80,
  numMatchesAfter = 8,
  onSubmit,
}: ProjectsMatchesModalProps) => (
  <>
    <Modal open={openModal} closeOnEsc={false}>
      <div className="space-y-4 pl-4">
        <div>
          <p className="text-2xl ">{header1}</p>
        </div>
        <div>
          <p className="tracking-wider">{header2}</p>
        </div>
      </div>
      <div className="my-4 flex justify-center space-x-6 px-6">
        <div className="flex h-60 w-60 justify-center rounded-md border-2">
          <div className="flex flex-col items-center justify-center space-y-2">
            <div>{topLeftText}</div>
            <div className="mx-4">
              <BatteryStepper
                batteryPercentage={batteryPercentageBefore}
                numMatches={numMatchesBefore}
                size={"sm"}
                text={matchType}
              />
            </div>
            <div>{bottomLeftText}</div>
          </div>
        </div>
        <div className="flex h-60 w-60 justify-center rounded-md border-2">
          <div className="flex flex-col items-center justify-center space-y-2">
            <div> {topRightText}</div>
            <div className="mx-4">
              <BatteryStepper
                batteryPercentage={batteryPercentageAfter}
                numMatches={numMatchesAfter}
                size={"sm"}
                text={matchType}
              />
            </div>
            <div>{bottomRightText}</div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          radius="rounded"
          variant={`secondary`}
          onClick={() => onSubmit!()}
        >
          Next
        </Button>
      </div>
    </Modal>
  </>
);
