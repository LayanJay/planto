import {useNavigation, useRoute} from '@react-navigation/native';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Modal, Pressable, ScrollView, Text, View} from 'react-native';
import AnswerCard from '../components/common/forum/answer-card';
import Input from '../components/common/input';
import {RootStackScreenProps} from '../interfaces/navigation';

type Props = {};
const SingleQuestionScreen = (props: Props) => {
  const navigation = useNavigation<RootStackScreenProps<'Single Question'>['navigation']>();
  const route = useRoute<RootStackScreenProps<'Single Question'>['route']>();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const {
    control,
    reset,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      reply: '',
    },
  });

  return (
    <View className='p-4 flex'>
      <View>
        <Text className='font-main text-2xl font-semibold'>Title</Text>
        <View className='flex flex-row justify-between w-full'>
          <Text className='font-main text-xs pt-1'>by someone</Text>
          <Text className='font-main text-xs pt-1 text-grey-dark'>2020/10/10</Text>
        </View>
        <View className='pl-1 pr-6 flex items-center'>
          <Text className='font-main text-xs pt-1'>5</Text>
        </View>
        <Text className='font-main text-base w-4/5'>This is the question</Text>

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
          <View>
            <Pressable className='bg-primary-main text-white flex flex-row items-center justify-center py-2 mt-3 mb-2'>
              <Text className='text-white text-lg'>Post</Text>
            </Pressable>
          </View>

          <Pressable
            className='bg-black text-white flex flex-row items-center justify-center py-2 mb-3 bg-red-800'
            onPress={() => setOpenDeleteModal(true)}
          >
            <Text className='font-main text-white text-lg'>Delete</Text>
          </Pressable>
        </View>
        <View className='h-96 pt-2'>
          <Text className='font-main text-lg'>Answers</Text>
          <ScrollView className='pt-1 h-full'>
            <AnswerCard data={'s'} />
          </ScrollView>
        </View>
      </View>

      <Modal animationType='fade' visible={openDeleteModal} transparent={false}>
        <View className='px-4 py-8 flex h-full'>
          <View>
            <Text className='font-main text-2xl font-semibold'>Are you sure?</Text>
            <Text className='font-main text-lg pt-3 pb-4'>
              Are you sure you want to delete this question? This action cannot be undone.
            </Text>
          </View>
          <View className='mt-auto'>
            <Pressable
              className='bg-black text-white flex flex-row items-center justify-center py-2 mt-3 mb-1'
              onPress={() => {
                setOpenDeleteModal(false);
              }}
            >
              <Text className='font-main text-white text-lg'>Cancel</Text>
            </Pressable>
            <Pressable
              className='bg-red text-white flex flex-row items-center justify-center py-2 mt-1 mb-2 '
              onPress={() => {
                // handleDeleteQuestion(questionId);
                setOpenDeleteModal(false);
              }}
            >
              <Text className='font-main text-white text-lg'>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default SingleQuestionScreen;
