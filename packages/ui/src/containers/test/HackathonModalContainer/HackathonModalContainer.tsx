import { HackathonContext, HackathonProjectModal } from "@eden/package-context";
import {
  CongratulationsModal,
  DataReviewModal,
  FindTalentDropdownModal,
  PrioritizeModal,
  ProjectsMatchesModal,
  RequirementsModal,
  ReviewModal,
  SkipFlowModal,
  WarningModal,
  //   SavingProjectModal,
} from "@eden/package-ui";
import { useContext, useState } from "react";

// @TODO mock data to be removed

const rangeNumbers: number[] = [];

for (let i = 0; i < 500; i++) {
  rangeNumbers.push(Math.floor(Math.random() * 80) + 1);
}

// -----------------

export interface IHackathonModalContainerProps {
  // eslint-disable-next-line no-unused-vars
  setSubmittingTalentAttributes?: (val: any) => void;
  mockData?: any;
}

export const HackathonModalContainer = ({
  setSubmittingTalentAttributes,
  mockData,
}: IHackathonModalContainerProps) => {
  const {
    project,
    // dispatchProject,
    openModal,
    setOpenModal,
    // submitting,
    // setSubmitting,
  } = useContext(HackathonContext);

  const [talentAttributes, setTalentAttributes] = useState<any>({});
  const [nextStep, setNextStep] = useState<any>(null);

  //   console.log("mockData", mockData);

  //   useEffect(() => {
  //     if (submitting) {
  //       setOpenModal(HackathonProjectModal.SAVING_PROJECT);
  //     }
  //   }, [submitting]);
  const mockDataMap1 = {
    SkillTree: {
      subCategories: {
        title: mockData?.SkillTree?.category?.title,
        subTitle: mockData?.SkillTree?.category?.subTitle,
      },
    },
  };

  if (mockData?.SkillTree) {
    Object.keys(mockData?.SkillTree).forEach((key) => {
      if (key !== "category")
        mockDataMap1.SkillTree = {
          ...mockDataMap1.SkillTree,
          [key as keyof Object]: {
            content:
              mockData.SkillTree[key as keyof Object]?.subCategories?.content,
          },
        };
    });
  }

  const mockDataMap2 = {
    SkillTree: {
      subCategories: {
        title: mockData?.UserProfileTree?.category?.title,
        subTitle: mockData?.UserProfileTree?.category?.subTitle,
      },
    },
  };

  if (mockData?.UserProfileTree) {
    Object.keys(mockData?.UserProfileTree).forEach((key) => {
      if (key !== "category")
        mockDataMap2.SkillTree = {
          ...mockDataMap2.SkillTree,
          [key as keyof Object]: {
            content:
              mockData.UserProfileTree[key as keyof Object]?.subCategories
                ?.content,
          },
        };
    });
  }

  return (
    <>
      {openModal === HackathonProjectModal.SKIP_ALERT && (
        <SkipFlowModal
          openModal={openModal === HackathonProjectModal.SKIP_ALERT}
          onSkipStep={() => setOpenModal(nextStep)}
          onSkipFlow={() => setOpenModal(null)}
          percentage={50}
        />
      )}

      {openModal === HackathonProjectModal.START_INFO && (
        <ProjectsMatchesModal
          openModal={openModal === HackathonProjectModal.START_INFO}
          onSubmit={() => {
            setOpenModal(HackathonProjectModal.USER_ROLE);
          }}
          header1={"Find your ideal project!"}
          header2={
            "We will help you find the perfect match based on your skills and preferences."
          }
          topLeftText={"We have"}
          bottomLeftText={"in Eden today"}
          matchType={"Projects"}
          topRightText={"AI will find the best"}
          bottomRightText={"for you to choose from"}
          batteryPercentageBefore={10}
          numMatchesBefore={125}
          batteryPercentageAfter={70}
          numMatchesAfter={8}
        />
      )}

      {openModal === HackathonProjectModal.USER_ROLE && (
        <FindTalentDropdownModal
          openModal={openModal === HackathonProjectModal.USER_ROLE}
          onClose={() => {
            setOpenModal(HackathonProjectModal.SKIP_ALERT);
            setNextStep(HackathonProjectModal.SKILLS_CATEGORY);
          }}
          // eslint-disable-next-line no-unused-vars
          onSubmit={(val: any) => {
            console.log("val", val);
            setOpenModal(HackathonProjectModal.SKILLS_CATEGORY);
          }}
          mockData={mockDataMap2.SkillTree}
        />
      )}

      {openModal === HackathonProjectModal.SKILLS_CATEGORY && (
        <FindTalentDropdownModal
          openModal={openModal === HackathonProjectModal.SKILLS_CATEGORY}
          onClose={() => {
            setOpenModal(HackathonProjectModal.SKIP_ALERT);
            setNextStep(HackathonProjectModal.REQUIREMENTS);
          }}
          // eslint-disable-next-line no-unused-vars
          onSubmit={(val: any) => {
            setSubmittingTalentAttributes!(
              Object.keys(val)
                .filter((key) => val[key].length)
                .flat()[0]
            );
            const main = Object.keys(val)
              .filter((key) => val[key].length)
              .flat()[0];

            setTalentAttributes({
              ...talentAttributes,
              main: [{ name: main }],
            });
            if (main)
              setSubmittingTalentAttributes!({
                main: [{ name: main }],
              });

            setOpenModal(HackathonProjectModal.SKILLS_SUBCATEGORY);
          }}
          mockData={mockDataMap1.SkillTree}
          // onClose={() => setOpenModal(null)}
        />
      )}

      {openModal === HackathonProjectModal.SKILLS_SUBCATEGORY && (
        <FindTalentDropdownModal
          openModal={openModal === HackathonProjectModal.SKILLS_SUBCATEGORY}
          onClose={() => {
            setOpenModal(HackathonProjectModal.SKIP_ALERT);
            setNextStep(HackathonProjectModal.REQUIREMENTS);
          }}
          // eslint-disable-next-line no-unused-vars
          onSubmit={(val: any) => {
            const third = Object.keys(val)
              .map((key) => val[key])
              .flat();

            setTalentAttributes({ ...talentAttributes, third: third });
            // setSubmittingTalentAttributes!(val);
            setOpenModal(HackathonProjectModal.REQUIREMENTS);
          }}
          mockData={mockData.SkillTree[talentAttributes?.main[0]?.name]}
          // onClose={() => setOpenModal(null)}
        />
      )}

      {openModal === HackathonProjectModal.PRIORITIZE && (
        <PrioritizeModal
          key={"" + project?.role?.length}
          battery
          numMatches={120}
          openModal={openModal === HackathonProjectModal.PRIORITIZE}
          onClose={() => {
            // setOpenModal(LaunchProjectModal.REQUIREMENTS);
            setOpenModal(null);
          }}
          onSubmit={(val) => {
            console.log(val);
            setOpenModal(HackathonProjectModal.REQUIREMENTS);
          }}
        />
      )}
      {openModal === HackathonProjectModal.REQUIREMENTS && (
        <RequirementsModal
          salaryData={rangeNumbers}
          battery
          numMatches={90}
          openModal={openModal === HackathonProjectModal.REQUIREMENTS}
          onClose={() => {
            // setOpenModal(LaunchProjectModal.PROJECT_INFO);
            setOpenModal(null);
          }}
          onSubmit={(val) => {
            console.log(val);
            setOpenModal(HackathonProjectModal.WARNING);
            // setOpenModal(null);
          }}
        />
      )}

      {openModal === HackathonProjectModal.PROJECT_INFO && (
        <ReviewModal
          data={talentAttributes as DataReviewModal}
          openModal={openModal === HackathonProjectModal.PROJECT_INFO}
          onClose={() => {
            setOpenModal(null);
            // setOpenModal(HackathonProjectModal.CONGRATULATIONS);
          }}
        />
      )}
      {/* {openModal === HackathonProjectModal.SAVING_PROJECT && (
        <SavingProjectModal openModal />
      )} */}
      {openModal === HackathonProjectModal.CONGRATULATIONS && (
        <CongratulationsModal openModal />
      )}
      {openModal === HackathonProjectModal.WARNING && (
        <WarningModal
          openModal
          profilePercentage={20}
          canSeeProjects={true}
          canProjectsSee={false}
          onSkip={function (): void {
            setOpenModal(null);
          }}
          onNext={function (): void {
            setOpenModal(null);
          }}
        />
      )}
    </>
  );
};
