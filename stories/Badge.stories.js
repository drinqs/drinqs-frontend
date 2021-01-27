import Badge from '@/components/Badge.vue';

export default {
  title: 'Badge',
  argTypes: {
    text: {
      type: 'string',
    },
    withDot: {
      type: 'boolean',
    },
    withHover: {
      type: 'boolean',
    },
    color: {
      control: {
        type: 'select',
        options: [
          'teal',
          'gray',
          'yellow',
          'orange',
          'red',
          'green',
          'blue',
          'indigo',
          'purple',
          'pink',
        ],
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  components: { Badge },
  props: Object.keys(argTypes),
  computed: {
    dotColor() {
      if (this.withDot) return `bg-${this.color}-400`;
      return '';
    },
    backgroundColor() {
      return `bg-${this.color}-100`;
    },
    hoverColor() {
      if (this.withHover) return `hover:bg-${this.color}-500`;
      return '';
    },
    textColor() {
      return `text-${this.color}-700`;
    },
  },
  template: `
    <Badge
      :dot-color="dotColor"
      :background-color="backgroundColor"
      :hover-color="hoverColor"
      :text-color="textColor"
    >
      {{ text }}
    </Badge>
  `,
});

export const Teal = Template.bind({});
Teal.args = {
  text: 'Ordinary Cocktail',
  withDot: true,
  withHover: true,
  color: 'teal',
};

export const Gray = Template.bind({});
Gray.args = {
  text: 'Ordinary Cocktail',
  withDot: true,
  withHover: true,
  color: 'gray',
};

export const Yellow = Template.bind({});
Yellow.args = {
  text: 'Ordinary Cocktail',
  withDot: true,
  withHover: true,
  color: 'yellow',
};

export const Orange = Template.bind({});
Orange.args = {
  text: 'Ordinary Cocktail',
  withDot: true,
  withHover: true,
  color: 'orange',
};

export const Red = Template.bind({});
Red.args = {
  text: 'Ordinary Cocktail',
  withDot: true,
  withHover: true,
  color: 'red',
};

export const Green = Template.bind({});
Green.args = {
  text: 'Ordinary Cocktail',
  withDot: true,
  withHover: true,
  color: 'green',
};

export const Blue = Template.bind({});
Blue.args = {
  text: 'Ordinary Cocktail',
  withDot: true,
  withHover: true,
  color: 'blue',
};

export const Indigo = Template.bind({});
Indigo.args = {
  text: 'Ordinary Cocktail',
  withDot: true,
  withHover: true,
  color: 'indigo',
};

export const Purple = Template.bind({});
Purple.args = {
  text: 'Ordinary Cocktail',
  withDot: true,
  withHover: true,
  color: 'purple',
};

export const Pink = Template.bind({});
Pink.args = {
  text: 'Ordinary Cocktail',
  withDot: true,
  withHover: true,
  color: 'pink',
};
