import Notification from '@/components/Notification.vue';

export default {
  title: 'Notification',
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['success', 'error', 'warning', 'info'],
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  components: { Notification },
  props: Object.keys(argTypes),
  template: '<Notification :type="type" :message="message" :short-message="shortMessage" :delay="60000000" />',
});

export const Success = Template.bind({});
Success.args = { type: 'success', message: 'This is a very nice long success message!', shortMessage: 'Success' };

export const Warning = Template.bind({});
Warning.args = { type: 'warning', message: 'This is a very nice long warning message!', shortMessage: 'Warning' };

export const Info = Template.bind({});
Info.args = { type: 'info', message: 'This is a very nice long information message!', shortMessage: 'Information' };

export const Error = Template.bind({});
Error.args = { type: 'error', message: 'This is a very nice long error message!', shortMessage: 'Error' };
