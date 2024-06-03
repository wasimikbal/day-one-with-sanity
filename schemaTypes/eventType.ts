import {defineField, defineType} from 'sanity'
import {CalendarIcon} from '@sanity/icons'

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,
  
  groups: [
    {name: 'details', title: 'Details'},
    {name: 'editorial', title: 'Editorial'},
  ],
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      group: ['details', 'editorial'],
    }),

    defineField({
      name: 'slug',
      type: 'slug',
      group: 'details',
      options: {source: 'name'},
      hidden: ({document}) => !document?.name, // Will be hidden if the document don't have a name yet.
      validation: (rule) => rule.required().error('This field is required to publish an event'),
    }),

    defineField({
      name: 'eventType',
      type: 'string',
      group: 'details',
      options: {
        list: ['In-person', 'virtual'],
        layout: 'radio',
      },
    }),

    defineField({
      name: 'date',
      type: 'datetime',
      group: 'details',
    }),

    defineField({
      name: 'doorsOpen',
      group: 'details',
      description: 'Number of minutes before the start time for the admission',
      type: 'number',
      initialValue: 60,
    }),

    defineField({
      name: 'venue',
      type: 'reference',
      group: 'details',
      to: [{type: 'venue'}],
      // Will be readonly if not already has a value and type of the event is virtual
      readOnly: ({value, document}) => !value && document?.eventType === 'virtual',
      validation: (value) =>
        value.custom((value, context) => {
          // if value is not null and eventType is virtual then
          if (value && context?.document?.eventType === 'virtual') {
            return 'Only in-person events can have a venue'
          }
          return true
        }),
    }),

    defineField({
      name: 'headline',
      type: 'reference',
      group: 'details',
      to: [{type: 'artist'}],
    }),

    defineField({
      name: 'image',
      group: 'editorial',
      type: 'image',
    }),

    defineField({
      name: 'details',
      group: 'editorial',
      type: 'array',
      of: [{type: 'block'}],
    }),

    defineField({
      name: 'tickets',
      type: 'url',
      group: 'details',
    }),
  ],
  preview:{
    select :{
        title: 'name',
        venue: 'venue.name',
        artist: 'headline.name',
        date: 'date',
        image: 'image',
    }
  },

  


})
