import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import ButtonBase from '../../components/common/buttons/button-base';
import InputBase from '../../components/common/inputs/input-base';
import useRouter from '../../hooks/router/use-router';
import { RootStackScreenProps } from '../../interfaces/navigation';
import { CategoryType, ProductSchema } from '../../schemas/product-schema';
import { db, storage } from '../../config/firebase-config';
import { useCurrentUser } from '../../hooks/user/use-current-user';
import { FirestoreCollections } from '../../utils/firebase-utils';

type Props = {};

const EditProductScreen = (props: Props) => {
  const router = useRouter('Edit Product');
  const route = useRoute<RootStackScreenProps<'Edit Product'>['route']>();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(route.params.category);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([
    { label: 'Outdoor', value: 'outdoor' },
    { label: 'Indoor', value: 'indoor' },
  ]);

  const { control, reset, formState, handleSubmit } = useForm();
  const { user } = useCurrentUser(true);

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);

    const product = ProductSchema.createDocFromJson({
      name: data.name,
      description: data.description,
      category: value as CategoryType,
      image: route.params.image,
      inventory: data.inventory,
      price: data.price,
      seller: route.params.seller,
    });

    await db().collection(FirestoreCollections.PRODUCTS).doc(route.params.id!).update(product);

    setLoading(false);

    router.replace('All Products');
  });

  return (
    <ScrollView className='p-4 flex '>
      <View className='h-full flex mb-20' style={{ gap: 7 }}>
        <InputBase
          control={control}
          name='name'
          label='Plant Name'
          defaultValue={route.params.name}
          placeholder='Name of your plant'
          inputWrapperClassNames='mb-4'
          rules={{
            required: '*Required',
          }}
        />

        <InputBase
          label='Description'
          name='description'
          defaultValue={route.params.description}
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
          defaultValue={route.params.price}
          placeholder='Price in LKR'
          inputWrapperClassNames='mb-4'
          rules={{
            required: '*Required',
            pattern: {
              value: /^[0-9]*$/,
              message: 'Price must be a number',
            },
          }}
        />

        <View className='z-20'>
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
          defaultValue={route.params.inventory}
          placeholder='Number of items left in inventory'
          inputWrapperClassNames='mt-8 mb-4'
          rules={{
            required: '*Required',
            pattern: {
              value: /^[0-9]*$/,
              message: 'Inventory must be a number',
            },
          }}
        />

        <ButtonBase loading={loading} variant={'primary'} onPress={onSubmit} buttonClassName='mt-4'>
          <Text className='font-main font-semibold text-lg text-white text-center'>Save</Text>
        </ButtonBase>
      </View>
    </ScrollView>
  );
};
export default EditProductScreen;
