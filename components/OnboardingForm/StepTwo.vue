<template>
  <div class="h-full w-full pb-2 flex flex-col text-sm xs:text-base">
    <div class="mb-2">
      <p class="mb-1">
        You can review and bookmark any cocktail to tell us the preference of your taste buds.
        <span class="hidden xs:inline">
          Remember, no matter how you mark a cocktail, it will always show up in the
          <span class="font-medium text-primary">"Bookmarks & Reviews"</span>-section,
          you can find on your avatar in the top right corner.
        </span>
      </p>
    </div>

    <div class="w-full flex-auto overflow-y-scroll">
      <div class="w-full flex items-center">
        <div class="flex items-center justify-center w-16 h-16">
          <ThumbUpSolid class="w-6 h-6 mr-1 text-green-600" />
          <ThumbDownSolid class="w-6 h-6 text-red-600" />
        </div>

        <div class="h-full w-full px-3 py-2 2xs:mb-2 xs:p-4">
          <div class="font-semibold text-secondary">
            Like / Dislike
          </div>
          <p>
            <span class="hidden 2xs:inline">
              In the (tinder-like) Drinq-it mode, you implicily <span class="font-medium">like</span>
              or <span class="font-medium">dislike</span> the currently shown cocktail.
            </span>
            This action is
            used as a <span class="font-medium text-primary">light indicator</span> meaning you want to try it. Or never
            see it again. Your choice.
          </p>
        </div>
      </div>

      <div class="w-full flex items-center">
        <div class="flex items-center justify-center w-16 h-16">
          <Bookmark class="w-6 h-6 mr-1 text-primary" />
          <Bookmark solid class="w-6 h-6 text-primary" />
        </div>

        <div class="h-full w-full px-3 py-2 2xs:p-4 2xs:mb-2">
          <div class="font-semibold text-secondary">
            Bookmark
          </div>
          <p>
            <span class="hidden 2xs:inline">Naturally, you can bookmark a cocktail.</span>
            This is used as a <span class="font-medium text-primary">heavy indicator</span>
            meaning that you tried the cocktail and / or really like it.
            We will try to find more of those for you.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
