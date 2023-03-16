import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Image, Modal, ScrollView, Text, View } from 'react-native';
import ButtonBase from '../components/common/buttons/button-base';
import AnswerCard from '../components/common/forum/answer-card';
import Input from '../components/common/input';
import useRouter from '../hooks/use-router';
import { RootStackScreenProps } from '../interfaces/navigation';

type Props = {};
const SingleQuestionScreen = (props: Props) => {
  const router = useRouter('Single Product');
  const route = useRoute<RootStackScreenProps<'Single Question'>['route']>();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      reply: '',
    },
  });

  return (
    <View className='p-4 flex'>
      <View>
        <Text className='font-main text-2xl font-semibold text-black/70'>{route.params.id}</Text>
      </View>
    </View>
  );
};
export default SingleQuestionScreen;
