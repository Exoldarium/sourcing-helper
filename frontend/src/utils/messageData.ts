export const APPLY_MSG =
  'You can use this link to apply for the position first. Be sure to upload you updated CV in English. We will review the application and if everything is in order we will schedule an initial interview with one of our recruiters.';

export const REJECTION_MSG =
  'I see. In any case we can stay in touch as we are always having more openings.\n\nRegards,\n\nDusan Milosavljevic\nRecruiter at DistantJob';

export const INTERVIEW_MSG =
  'Hi XXXXXX! I\'m happy to tell you that you\'ve received an interview scheduling invitation. Please check your email, including the spam folder, and make sure you answer as soon as possible. Make sure you add the event to your calendar and be there on time. Feel free to send me a message if you have any questions. Good luck!';

export const GDPR_MSG =
  'Before we proceed you will have to give me your permission to upload your CV to our system.\n\nWe are GDPR compliant, so I need your permission to store your CV and personal information in our system. Without your consent, we won\'t be able to move further with our interviewing process. Do I have your permission to add your CV and contact information to our system?';

export const BENEFITS_MSG =
  'If hired you will work as an independent contractor. Regarding the benefits, we offer paid leaves, time off for holidays and unpaid leaves.';

export const generateFollowUp = (link: string) => {
  return [
    `Hi again XXXXX! I'm not sure if you received my message but we are still on the search for a XXXXXXX! Feel free to ask any questions you might have or you can use this link to apply for the position!\n\nRegards,\n\nDusan Milosavljevic\nRecruiter at DistantJob\n\n${link}`,
    `Hello XXXXXX! We are still in need of a XXXXXX, are you still interested? You can send me a message if you have any questions or you can use this link to apply for the position!\n\nRegards,\n\nDusan Milosavljevic\nRecruiter at DistantJobn\n${link}`,
    `Hello XXXX! We are still waiting for you answer regarding the XXXXX position. You can use the link to apply for the position or you can send me your CV here in LinkedIn. If you have any questions, feel free to send me a message.\n\n Regards,\n\nDusan Milosavljevic\nRecruiter at DistantJobn\n${link}`
  ];
};

export const generateApplyMessage = (link: string) => {
  return `You can use this link to apply for the position first. Be sure to upload you updated CV in English. We will review the application and if everything is in order we will schedule an initial interview with one of our recruiters.\n\n${link}`;
};