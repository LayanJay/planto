import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import InputBase from '../components/common/inputs/input-base';
import useRouter from '../hooks/use-router';
import { RootStackScreenProps } from '../interfaces/navigation';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import ButtonBase from '../components/common/buttons/button-base';
import DropDownPicker from 'react-native-dropdown-picker';

type Props = {};

const AddProductScreen = (props: Props) => {
  const router = useRouter('Add Product');
  const route = useRoute<RootStackScreenProps<'Add Product'>['route']>();

  const [image, setImage] = useState<Asset>();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Outdoor', value: 'outdoor' },
    { label: 'Indoor', value: 'indoor' },
  ]);

  const { control, reset, handleSubmit, formState } = useForm({
    defaultValues: {
      reply: '',
    },
  });

  const selectImage = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });

    if (result.assets) {
      setImage(result.assets[0]);
    }
  };

  return (
    <ScrollView className='p-4 flex '>
      <View className='h-full flex mb-20' style={{ gap: 7 }}>
        <InputBase
          control={control}
          name='name'
          label='Plant Name'
          placeholder='Name of your plant'
          inputWrapperClassNames='mb-4'
        />

        <InputBase
          label='Description'
          name='description'
          placeholder='Description your plant'
          control={control}
          inputWrapperClassNames='mb-4'
          rules={{
            required: '*Required',
          }}
        />

        <InputBase
          control={control}
          name='price'
          label='Price'
          placeholder='Price in USD'
          inputWrapperClassNames='mb-4'
        />

        <TouchableOpacity
          className='w-full h-48 bg-black/10 p-7 rounded-lg mt-2 flex items-center justify-center'
          onPress={selectImage}
        >
          {/* TODO: Prolly add a gallery icon thingy */}
          {image ? (
            <Image className='w-44 h-44 rounded-md border' source={{ uri: image.uri }} />
          ) : (
            <Text>Choose an image</Text>
          )}
        </TouchableOpacity>

        <View className='mt-6'>
          <Text className='mb-2'>Category</Text>
          <DropDownPicker
            listMode='SCROLLVIEW'
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
        </View>

        <InputBase
          control={control}
          name='inventory'
          label='Inventory'
          placeholder='Number of items left in inventory'
          inputWrapperClassNames=' mt-8 mb-4'
        />

        <ButtonBase variant={'primary'} buttonClassName='mt-4'>
          <Text className='font-main font-semibold text-lg text-white text-center'>
            Create Plant
          </Text>
        </ButtonBase>
      </View>
    </ScrollView>
  );
};
export default AddProductScreen;
