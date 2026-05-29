import type { Question } from "../types";
import { HER_NAME } from "../config/personalization";

export const QUESTIONS: Question[] = [
  {
    key: "coffee_or_walk",
    label: "coffee date or late night walk?",
    emoji: "\u2615",
    type: "choice",
    options: ["coffee date", "late night walk"],
  },
  {
    key: "always_cute",
    label: `${HER_NAME}, are you always this cute or is this temporary?`,
    emoji: "\uD83D\uDE0D",
    type: "choice",
    options: ["always this cute", "somehow getting cuter", "top secret"],
  },
  {
    key: "cats_or_dogs",
    label: "cats or dogs?",
    emoji: "\uD83D\uDC3E",
    type: "choice",
    options: ["cats", "dogs"],
  },
  {
    key: "green_flag",
    label: "what's your biggest green flag?",
    emoji: "\uD83D\uDC9A",
    type: "text",
  },
  {
    key: "the_ick",
    label: "what gives you the biggest ick?",
    emoji: "\uD83D\uDE2C",
    type: "text",
  },
  {
    key: "favorite_food",
    label: "favorite type of food?",
    emoji: "\uD83C\uDF5D",
    type: "text",
  },
  {
    key: "ideal_date",
    label: "choose your ideal first date:",
    emoji: "\u2728",
    subtitle: "no wrong answers. only good vibes.",
    type: "choice",
    options: ["coffee", "sushi", "arcade", "sunset walk"],
  },
  {
    key: "steal_fries",
    label: "would you steal my fries?",
    emoji: "\uD83C\uDF5F",
    type: "choice",
    options: ["obviously yes", "only one fry", "never (liar)"],
  },
  {
    key: "bully_friends",
    label: "be honest... how much do you bully your friends?",
    emoji: "\uD83D\uDE08",
    type: "choice",
    options: ["professionally", "a little", "i am the victim actually"],
  },
];