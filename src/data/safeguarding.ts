/**
 * KiwiHacks Events Safeguarding Policy, published so that attendees, parents
 * and volunteers can read it without asking. Source of truth is the
 * "KiwiHacks Health & Safety Policy" doc in the KiwiHacks shared drive.
 * Last reviewed: 15 September 2026.
 */

export type PolicySection = {
  id: string;
  title: string;
  intro?: string;
  points: string[];
};

export const POLICY_LAST_REVIEWED = "15 September 2026";

export const POLICY_SECTIONS: PolicySection[] = [
  {
    id: "purpose",
    title: "Purpose and scope",
    intro:
      "This policy exists so that every participant, volunteer, mentor and staff member at a KiwiHacks event is safe, respected and supported. It sits alongside our Code of Conduct.",
    points: [
      "It applies to participants aged 13 to 18, their parents and guardians, organisers, event staff and volunteers, mentors, guest speakers, vendors and venue staff, and anyone else present at the event.",
      "It covers every event location: the venue, sleeping and rest areas, and common spaces.",
      "It covers every part of the event: the lead-up, the 24 hours themselves, social time, and the wrap-up afterwards.",
    ],
  },
  {
    id: "principles",
    title: "Our principles",
    points: [
      "Everyone is treated with dignity, respect and fairness, regardless of gender identity, sex, ethnicity, disability, race or language.",
      "The safety and welfare of minors is the paramount consideration in every decision we make.",
      "No bullying, harassment, discrimination or inappropriate interpersonal conduct. Ever.",
      "Concerns are reported swiftly, handled sensitively, and kept confidential.",
      "We work to a duty of care: we reduce risk before, during and after events rather than reacting to problems as they arise.",
    ],
  },
  {
    id: "supervision",
    title: "Supervision and the venue",
    points: [
      "Every venue is risk-assessed before the event: emergency exits, accessible bathrooms, safe sleeping and rest zones, lighting, and the security of every entrance and exit.",
      "Our staffing ratio is one member of staff to every fifteen participants, maintained for the full 24 hours including overnight.",
      "Events are closed-door. Only registered attendees, organisers, mentors and chaperones are allowed in, and venues are staffed with security.",
      "Participants stay within the event perimeter for the whole event unless staff explicitly give permission to leave.",
      "Parents and guardians are not able to remain in event spaces, for the safety and comfort of all participants.",
    ],
  },
  {
    id: "check-in",
    title: "Sign in and sign out",
    points: [
      "Every arrival and departure is logged: time, name, guardian contact and signed consent.",
      "A minor can only leave the venue with explicit written parental consent.",
      "If a participant leaves before the end of the event without permission, we contact their parent or guardian and notify the Safeguarding Officer.",
    ],
  },
  {
    id: "boundaries",
    title: "Mentor and participant boundaries",
    points: [
      "Staff and volunteers are never alone with a minor, and do not interact with minors out of sight of other staff.",
      "One-on-one mentoring happens in visible, open spaces with at least one other volunteer present.",
      "Mentors and staff do not share personal contact details. Work emails, KiwiHacks Discord usernames and KiwiHacks phone numbers can be shared on request.",
      "All digital communication with participants happens over email or the KiwiHacks Discord, so it is visible to the team.",
      "Physical contact must be appropriate, participant-initiated, culturally sensitive, consenting and minimal.",
    ],
  },
  {
    id: "conduct",
    title: "Behavioural rules",
    points: [
      "Unprescribed alcohol, tobacco, marijuana and any controlled substance is prohibited for everyone at the event, participants and staff alike.",
      "Anyone found under the influence at an event faces serious consequences. This is a KiwiHacks red line and will involve the relevant authorities.",
      "Inappropriate content (sexual, violent or discriminatory) in any communication or presentation is prohibited.",
      "Event channels are not for hateful content, advertising, soliciting, or harassing other people.",
      "Quiet hours, rest breaks, water breaks and individual health needs are respected by everyone.",
    ],
  },
  {
    id: "medical",
    title: "First aid and medical",
    points: [
      "Every event carries a fully stocked first aid kit, and an organiser who knows how to use it.",
      "Participants disclose relevant medical and health information in advance: allergies, conditions and medications.",
      "Emergency contact and guardian details are rapidly accessible to organisers from a secure location.",
      "Over-the-counter medication is only given where a parent or guardian has approved that specific medication, dosage and timing in advance.",
      "An incident log is kept for the whole event: time, person, description, and action taken.",
    ],
  },
  {
    id: "reporting",
    title: "Reporting a concern",
    intro:
      "If something is wrong, tell us. You will never face action for making a report, and you do not have to be certain before you speak up.",
    points: [
      "Tell any organiser or the event's Safeguarding Officer. Their contact details are given to every attendee and family before the event.",
      "Concerns include bullying, harassment, discrimination or coercion; abuse or inappropriate behaviour; someone disclosing a personal safeguarding concern; a staff member crossing a boundary; or a mental health crisis.",
      "Staff and volunteers must escalate concerns to the lead organiser immediately, and every incident is logged on a formal report.",
      "In an emergency, call 111 first. Then contact KiwiHacks on 09 243 0984 or niko@kiwihacks.org immediately.",
      "All safeguarding incidents are reported within 18 hours, regardless of severity.",
      "Reports are confidential and only reach designated safeguarding personnel. Information is shared strictly on a need-to-know basis.",
      "There is no retaliation, ever, against someone who reports a concern or who experiences harm at an event.",
    ],
  },
  {
    id: "consequences",
    title: "If someone breaks the rules",
    points: [
      "Consequences may include a warning, removal from the event, being sent home with guardian contact, or a ban from future KiwiHacks events.",
      "Serious breaches (abuse, violence, sexual misconduct) lead to immediate removal and referral to the authorities.",
      "Every action is fair, transparent, and consistent with the Code of Conduct.",
    ],
  },
  {
    id: "consent",
    title: "Consent and parents",
    points: [
      "A parent or guardian must give explicit consent before a minor can take part, including emergency contacts, medical and support needs, media consent, and any attendance restrictions.",
      "Parents and guardians receive the event schedule, arrival and departure times, the venue address, and contact details for the lead organiser and Safeguarding Officer.",
      "Parents and guardians are also bound by this policy and the Code of Conduct.",
    ],
  },
  {
    id: "review",
    title: "Review",
    points: [
      "After every event, organisers run a safeguarding debrief covering incidents logged, lessons learned and feedback gathered.",
      "This policy is reviewed annually, and any change is communicated to future participants, staff and volunteers.",
    ],
  },
];
