import { useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import ButtonBase from '../components/common/buttons/button-base';
import AnswerCard from '../components/common/forum/answer-card';
import Input from '../components/common/input';
import useRouter from '../hooks/router/use-router';
import { useCurrentUser } from '../hooks/user/use-current-user';
import { RootStackScreenProps } from '../interfaces/navigation';
import { QuestionUtils } from '../utils/question-utils';

type Props = {};
const SingleQuestionScreen = (props: Props) => {
  const { authUser, user } = useCurrentUser(true);
  const router = useRouter('Single Question');
  const route = useRoute<RootStackScreenProps<'Single Question'>['route']>();
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [voted, setVoted] = useState<boolean>(false);
  // const [question, loading, error] = useGetQuestion('1');
  const handleDeleteQuestion = async (id: string) => {
    setDeleteLoading(true);
    await QuestionUtils.deleteQuestion(id);
    router.replace('All Questions');
  };

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
      {!deleteLoading ? (
        <View>
          <Text className='font-main text-2xl font-semibold text-black/70'>
            {route.params.title}
          </Text>
          <View className='flex flex-row justify-between w-full'>
            <Text className='font-main text-xs pt-1 text-black/70'>
              by {route.params.author_firstname + ' ' + route.params.author_lastname}
            </Text>
            <Text className='font-main text-xs pt-1 text-black/70'>
              {dayjs(route.params.date.toDate()).format('DD-MM-YYYY')}
            </Text>
          </View>
          <View className='pl-1 pr-6 flex items-center'>
            <View>
              {voted ? (
                <TouchableOpacity onPress={() => setVoted(false)}>
                  <Image source={require('../assets/images/like.png')} className='h-4 w-4' />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setVoted(true)}>
                  <Image source={require('../assets/images/heart.png')} className='h-4 w-4' />
                </TouchableOpacity>
              )}
            </View>

            <Text className='font-main text-xs pt-1 text-black/70'>
              {route.params.votes.length}
            </Text>
          </View>
          <Text className='font-main text-base w-4/5 text-black/70'>{route.params.question}</Text>

          <View>
            <Input
              style={'border p-2 rounded-sm'}
              inputStyle={'h-12'}
              control={control as any}
              errors={errors}
              name={'reply'}
              label={''}
              placeholder={'Share your thoughts here...'}
              registerOptions={{
                required: {
                  value: true,
                  message: '*Required',
                },
              }}
            />
            <View className='flex flex-col w-full'>
              <ButtonBase buttonClassName='mb-3' onPress={() => router.navigate('Login')}>
                <Text className='text-white font-main font-semibold text-lg text-center uppercase'>
                  Post
                </Text>
              </ButtonBase>
              {route.params.author_id === user?.id && (
                <ButtonBase
                  variant={'custom'}
                  buttonClassName='flex flex-row items-center justify-center space-x-3 bg-black active:bg-black/5 border border-black/20'
                  onPress={() => setOpenDeleteModal(true)}
                >
                  <Text className='text-white font-main font-semibold text-lg text-center uppercase'>
                    Delete
                  </Text>
                </ButtonBase>
              )}
            </View>
          </View>
          <View className='h-96 pt-2'>
            <Text className='font-main text-lg text-black/70'>Answers</Text>
            <ScrollView className='pt-1 h-full'>
              <AnswerCard data={'s'} />
            </ScrollView>
          </View>
        </View>
      ) : (
        <View>
          <Text>Deleting</Text>
        </View>
      )}

      <Modal animationType='fade' visible={openDeleteModal} transparent={false}>
        <View className='px-4 py-8 flex h-full'>
          <View>
            <Text className='font-main text-2xl font-semibold text-black/70'>Are you sure?</Text>
            <Text className='font-main text-lg pt-3 pb-4 text-black/70'>
              Are you sure you want to delete this question? This action cannot be undone.
            </Text>
          </View>
          <View className='mt-auto flex flex-col w-full'>
            <ButtonBase buttonClassName='mb-3' onPress={() => setOpenDeleteModal(false)}>
              <Text className='text-white font-main font-semibold text-lg text-center uppercase'>
                Cancel
              </Text>
            </ButtonBase>
            <ButtonBase
              variant={'custom'}
              buttonClassName='flex flex-row items-center justify-center space-x-3 bg-red border border-black/20'
              onPress={() => {
                handleDeleteQuestion(route.params.id);
                setOpenDeleteModal(false);
              }}
            >
              <Text className='text-white font-main font-semibold text-lg text-center uppercase'>
                Confirm
              </Text>
            </ButtonBase>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default SingleQuestionScreen;
