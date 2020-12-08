import CocktailTile from '@/components/CocktailTile.vue';

export default {
  title: 'Cocktail Tile',
  argTypes: {
    name: {
      type: 'string',
    },
    imageSrc: {
      type: 'string',
    },
    alcoholic: {
      type: 'boolean',
    },
    ingredientNames: {
      type: 'array',
      separator: ',',
    },
  },
};

const Template = (args, { argTypes }) => ({
  components: { CocktailTile },
  props: Object.keys(argTypes),
  computed: { ingredients() { return this.ingredientNames.map((name) => ({ name })); } },
  template: '<CocktailTile :cocktail="{ name, imageSrc, alcoholic, ingredients }" />',
});

export const Default = Template.bind({});
Default.args = {
  name: 'Tequila Sunrise',
  ingredientNames: ['Rum', 'Liebe', 'Orangensaft', 'Zeug'],
  alcoholic: true,
  imageSrc: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8Y29ja3RhaWx8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
};
