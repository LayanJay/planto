import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import ButtonBase from '../../components/common/buttons/button-base';
import InputBase from '../../components/common/inputs/input-base';
import useRouter from '../../hooks/router/use-router';
import { RootStackScreenProps } from '../../interfaces/navigation';
import { CategoryType, ProductSchema } from '../../schemas/product-schema';
import { db, storage } from '../../config/firebase-config';
import { useCurrentUser } from '../../hooks/user/use-current-user';
import { FirestoreCollections } from '../../utils/firebase-utils';

type Props = {};

const AddProductScreen = (props: Props) => {
  const router = useRouter('Add Product');
  const route = useRoute<RootStackScreenProps<'Add Product'>['route']>();

  const [image, setImage] = useState<Asset>();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [items, setItems] = useState([
    { label: 'Outdoor', value: 'outdoor' },
    { label: 'Indoor', value: 'indoor' },
  ]);

  const { control, reset, formState, handleSubmit } = useForm();
  const { user } = useCurrentUser(true);

  const selectImage = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });

    if (result.assets) {
      setImage(result.assets[0]);
      setImageError(false);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);

    if (!image?.uri) {
      setLoading(false);
      setImageError(true);
      return;
    }

    const filepath = `products/${image.fileName}`;
    const storageRef = storage().ref(filepath);
    const imageUpload = await storageRef.putFile(image?.uri);
    const downloadUrl = await storageRef.getDownloadURL();

    const product = ProductSchema.createDocFromJson({
      name: data.name,
      description: data.description,
      category: value as CategoryType,
      image: downloadUrl,
      inventory: data.inventory,
      price: data.price,
      seller: {
        id: user?.id as string,
        first_name: user?.first_name as string,
        last_name: user?.last_name as string,
      },
    });

    await db().collection(FirestoreCollections.PRODUCTS).add(product);

    setLoading(false);

    router.goBack();
  });

  return (
    <ScrollView className='p-4 flex '>
      <View className='h-full flex mb-20' style={{ gap: 7 }}>
        <InputBase
          control={control}
          name='name'
          label='Plant Name'
          placeholder='Name of your plant'
          inputWrapperClassNames='mb-4'
          rules={{
            required: '*Required',
          }}
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
          placeholder='Price in LKR'
          inputWrapperClassNames='mb-4'
          rules={{
            required: '*Required',
            pattern: {
              value: /^[0-9]*$/,
              message: 'Inventory must be a number',
            },
          }}
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

        {imageError && <Text className='text-red text-right text-xs truncate'>*Required</Text>}

        <View className='mt-6 z-10'>
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
          rules={{
            required: '*Required',
            pattern: {
              value: /^[0-9]*$/,
              message: 'Inventory must be a number',
            },
          }}
        />

        <ButtonBase loading={loading} variant={'primary'} onPress={onSubmit} buttonClassName='mt-4'>
          <Text className='font-main font-semibold text-lg text-white text-center'>
            Create Plant
          </Text>
        </ButtonBase>
      </View>
    </ScrollView>
  );
};
export default AddProductScreen;
