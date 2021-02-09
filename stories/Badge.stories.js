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
    removable: {
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
      return `bg-${this.color}-400`;
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
      :with-dot="withDot"
      :removable="removable"
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
  removable: true,
};

export const Gray = Template.bind({});
Gray.args = {
  text: 'Ordinary Cocktail',
  withDot: true,
  withHover: true,
  color: 'gray',
  removable: true,
};

export const Yellow = Template.bind({});
Yellow.args = {
  text: 'Ordinary Cocktail',
  withDot: true,
  withHover: true,
  color: 'yellow',
  removable: true,
};

export const Orange = Template.bind({});
Orange.args = {
  text: 'Ordinary Cocktail',
  withDot: true,
  withHover: true,
  color: 'orange',
  removable: true,
};

export const Red = Template.bind({});
Red.args = {
  text: 'Ordinary Cocktail',
  withDot: true,
  withHover: true,
  color: 'red',
  removable: true,
};

export const Green = Template.bind({});
Green.args = {
  text: 'Ordinary Cocktail',
  withDot: true,
  withHover: true,
  color: 'green',
  removable: true,
};

export const Blue = Template.bind({});
Blue.args = {
  text: 'Ordinary Cocktail',
  withDot: true,
  withHover: true,
  color: 'blue',
  removable: true,
};

export const Indigo = Template.bind({});
Indigo.args = {
  text: 'Ordinary Cocktail',
  withDot: true,
  withHover: true,
  color: 'indigo',
  removable: true,
};

export const Purple = Template.bind({});
Purple.args = {
  text: 'Ordinary Cocktail',
  withDot: true,
  withHover: true,
  color: 'purple',
  removable: true,
};

export const Pink = Template.bind({});
Pink.args = {
  text: 'Ordinary Cocktail',
  withDot: true,
  withHover: true,
  color: 'pink',
  removable: true,
};
