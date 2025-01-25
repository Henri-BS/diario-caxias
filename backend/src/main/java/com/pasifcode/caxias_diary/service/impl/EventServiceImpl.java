package com.pasifcode.caxias_diary.service.impl;

import com.pasifcode.caxias_diary.domain.entity.User;
import com.pasifcode.caxias_diary.domain.dto.EventDto;
import com.pasifcode.caxias_diary.domain.entity.Event;
import com.pasifcode.caxias_diary.domain.entity.Project;
import com.pasifcode.caxias_diary.domain.repository.EventRepository;
import com.pasifcode.caxias_diary.domain.repository.ProjectRepository;
import com.pasifcode.caxias_diary.domain.repository.UserRepository;
import com.pasifcode.caxias_diary.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
public class EventServiceImpl implements EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public Page<EventDto> findAll(Pageable pageable) {
        Page<Event> list = eventRepository.findAll(pageable);
        return list.map(EventDto::new);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<EventDto> findByProject(Project project, Pageable pageable) {
        Page<Event> list = eventRepository.findByProject(project, pageable);
        return list.map(EventDto::new);
    }

    @Override
    @Transactional(readOnly = true)
    public EventDto findEventById(Long id) {
        Event find = eventRepository.findById(id).orElseThrow();
        return new EventDto(find);
    }

    @Override
    public EventDto saveEvent(EventDto dto) {
        Project project = projectRepository.findByTitle(dto.getProjectTitle());
        User user = userRepository.findById(dto.getUserId()).orElseThrow();

        Event add = new Event();
        add.setTitle(dto.getEventTitle());
        add.setDescription(dto.getEventDescription());
        add.setImage(dto.getEventImage());
        add.setEventDate(dto.getEventDate());
        add.setEventStatus(dto.getEventStatus());
        add.setProject(project);
        add.setUser(user);

        return new EventDto(eventRepository.saveAndFlush(add));
    }

    @Override
    public EventDto updateEvent(EventDto dto) {
        Event edit = eventRepository.findById(dto.getId()).orElseThrow();

        edit.setId(edit.getId());
        edit.setTitle(dto.getEventTitle());
        edit.setDescription(dto.getEventDescription());
        edit.setEventDate(dto.getEventDate());
        edit.setEventStatus(dto.getEventStatus());

        return new EventDto(eventRepository.save(edit));
    }

    @Override
    public void deleteEvent(Long id) {
        this.eventRepository.deleteById(id);
    }


}
