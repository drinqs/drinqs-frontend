import BaseModal from '@/components/BaseModal.vue';
import Exclamation from '@/components/SvgIcons/Exclamation.vue';

export default {
  title: 'BaseModal',
};

export const DefaultModal = () => ({
  components: { BaseModal },
  template: `
    <BaseModal :show="true">
      <template #modal-headline>
        <strong>The Modal Headline</strong>
      </template>

      <template #modal-content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </template>

      <template #modal-footer>
        <span class="flex w-full rounded-md sm:ml-3 sm:w-auto justify-center">
          <button class="button-green">Save</button>
          <button class="button-gray">Cancel</button>
        </span>
      </template>
    </BaseModal>
  `,
});

export const ModalWithIcon = () => ({
  components: {
    BaseModal,
    Exclamation,
  },
  template: `
    <BaseModal :show="true">
      <template #modal-headline>
        <strong>Delete Stuff</strong>
      </template>

      <template #modal-icon>
        <Exclamation class="h-6 w-6 text-red-600" />
      </template>

      <template #modal-content>
        Are you sure, you want to delete the stuff?
        Everything will be gone!
      </template>

      <template #modal-footer>
        <span class="flex w-full rounded-md sm:ml-3 sm:w-auto justify-center">
          <button class="button-red">Delete</button>
          <button class="button-gray">Cancel</button>
        </span>
      </template>
    </BaseModal>
  `,
});
