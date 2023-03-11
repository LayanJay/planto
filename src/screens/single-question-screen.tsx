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
  const router = useRouter('Single Question');
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
        <Text className='font-main text-2xl font-semibold text-black/70'>Title</Text>
        <View className='flex flex-row justify-between w-full'>
          <Text className='font-main text-xs pt-1 text-black/70'>by someone</Text>
          <Text className='font-main text-xs pt-1 text-black/70'>2020/10/10</Text>
        </View>
        <View className='pl-1 pr-6 flex items-center'>
          <View>
            <Image source={require('../assets/images/like.png')} className='h-4 w-4' />
          </View>

          <Text className='font-main text-xs pt-1 text-black/70'>5</Text>
        </View>
        <Text className='font-main text-base w-4/5 text-black/70'>This is the question</Text>

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
            <ButtonBase
              variant={'custom'}
              buttonClassName='flex flex-row items-center justify-center space-x-3 bg-black active:bg-black/5 border border-black/20'
              onPress={() => setOpenDeleteModal(true)}
            >
              <Text className='text-white font-main font-semibold text-lg text-center uppercase'>
                Delete
              </Text>
            </ButtonBase>
          </View>
        </View>
        <View className='h-96 pt-2'>
          <Text className='font-main text-lg text-black/70'>Answers</Text>
          <ScrollView className='pt-1 h-full'>
            <AnswerCard data={'s'} />
          </ScrollView>
        </View>
      </View>

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
              onPress={() => setOpenDeleteModal(false)}
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
