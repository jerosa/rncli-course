import { Button, ButtonGroup, Input, Layout, List } from '@ui-kitten/components';
import { Formik } from 'formik';
import { Image, ScrollView, StyleSheet } from 'react-native';

import { CustomIcon } from '../../components/ui/CustomIcon';
import { FadeInImage } from '../../components/ui/FadeInImage';
import { MainLayout } from '../../layouts/MainLayout';
import { Gender, Product } from '../../../domain/entities/product';
import { Size } from '../../../infra/interfaces/teslo-products.responses';

interface ProductFormProps {
  product: Product;
  mutation: any;
  sizes: Size[];
  genders: Gender[];
  theme: any;
}

export const ProductForm = ( { product, mutation, sizes, genders, theme }: ProductFormProps ) => (
  <Formik
    initialValues={ product }
    onSubmit={ mutation.mutate }
  >
    { ( { handleChange, handleSubmit, values, setFieldValue } ) => (
      <MainLayout
        title={ values.title }
        subTitle={ `Price: ${ values.price }` }
      >
        <ScrollView style={ styles.scrollView }>

          {/* Images */ }
          <Layout style={ styles.imageLayout }>
            {
              ( values.images.length === 0 )
                ? (
                  <Image
                    source={ require( '../../../assets/no-product-image.png' ) }
                    style={ styles.productImage }
                  /> )
                : (
                  <List
                    data={ values.images }
                    horizontal
                    keyExtractor={ ( item ) => item }
                    showsHorizontalScrollIndicator={ false }
                    renderItem={ ( { item } ) => (
                      <FadeInImage
                        uri={ item }
                        style={ styles.productImage }
                      />
                    ) }
                  /> )
            }
          </Layout>


          {/* Form */ }
          <Layout style={ styles.formLayout }>
            <Input
              label='Title'
              style={ styles.inputVertical }
              value={ values.title }
              onChangeText={ handleChange( 'title' ) }
            />
            <Input
              label='Slug'
              style={ styles.inputVertical }
              value={ values.slug }
              onChangeText={ handleChange( 'slug' ) }
            />
            <Input
              label='Description'
              multiline
              numberOfLines={ 5 }
              style={ styles.inputVertical }
              value={ values.description }
              onChangeText={ handleChange( 'description' ) }
            />
          </Layout>


          {/* Price and Inventory */ }
          <Layout style={ styles.priceInventoryLayout }>
            <Input
              label='Price'
              style={ styles.inputFlex }
              keyboardType='numeric'
              value={ values.price.toString() }
              onChangeText={ handleChange( 'price' ) }
            />
            <Input
              label='Inventory'
              style={ styles.inputFlex }
              keyboardType='numeric'
              value={ values.stock.toString() }
              onChangeText={ handleChange( 'stock' ) }
            />
          </Layout>


          {/* Selectors */ }
          <ButtonGroup
            style={ styles.selectorGroup }
            size='medium'
            appearance='outline'
          >
            { sizes.map( size => (
              <Button
                onPress={ () => setFieldValue(
                  'sizes',
                  values.sizes.includes( size )
                    ? values.sizes.filter( s => s !== size )
                    : [ ...values.sizes, size ]
                ) }
                key={ size }
                style={ [
                  styles.selectorButton,
                  values.sizes.includes( size ) && { backgroundColor: theme[ 'color-primary-200' ] }
                ] }
              >
                { size }
              </Button>
            ) ) }
          </ButtonGroup>

          <ButtonGroup
            style={ styles.selectorGroup }
            size='medium'
            appearance='outline'
          >
            { genders.map( gender => (
              <Button
                onPress={ () => setFieldValue( 'gender', gender ) }
                key={ gender }
                style={ [
                  styles.selectorButton,
                  values.gender.startsWith( gender ) && { backgroundColor: theme[ 'color-primary-200' ] }
                ] }
              >
                { gender }
              </Button>
            ) ) }
          </ButtonGroup>


          {/* Save button */ }
          <Button
            accessoryLeft={ <CustomIcon name='save-outline' white /> }
            style={ styles.saveButton }
            onPress={ handleSubmit }
            disabled={ mutation.isPending }
          >
            Save
          </Button>

          {/* Allow scroll */ }
          <Layout style={ styles.scrollSpacer } />
        </ScrollView>
      </MainLayout>
    ) }
  </Formik>
);

const styles = StyleSheet.create( {
  scrollView: {
    flex: 1,
  },
  productImage: {
    width: 300,
    height: 300,
    marginHorizontal: 7,
  },
  imageLayout: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formLayout: {
    marginHorizontal: 10,
  },
  inputVertical: {
    marginVertical: 5,
  },
  priceInventoryLayout: {
    marginHorizontal: 15,
    flexDirection: 'row',
    gap: 10,
  },
  inputFlex: {
    flex: 1,
  },
  selectorGroup: {
    marginTop: 30,
    marginHorizontal: 15,
  },
  selectorButton: {
    flex: 1,
  },
  saveButton: {
    margin: 15,
  },
  scrollSpacer: {
    height: 200,
  },
} );
