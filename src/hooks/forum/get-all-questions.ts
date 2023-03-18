import { useCollection } from "@skillnation/react-native-firebase-hooks/lib/typescript/firestore";
import { QuestionSchema } from "../../schemas/question-schema";

export function getAllQuestions(): {
    questionError: Error | undefined;
    questionLoading: boolean;
    question: QuestionSchema
} {
    const [question, questionError, questionLoading] = useCollection()
}