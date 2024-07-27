package com.pasifcode.caxias_diary.service.impl;

import com.pasifcode.caxias_diary.domain.enums.Season;
import com.pasifcode.caxias_diary.domain.enums.Status;
import com.pasifcode.caxias_diary.dto.EventDto;
import com.pasifcode.caxias_diary.domain.entity.Event;
import com.pasifcode.caxias_diary.domain.entity.Project;
import com.pasifcode.caxias_diary.repository.EventRepository;
import com.pasifcode.caxias_diary.repository.ProjectRepository;
import com.pasifcode.caxias_diary.service.interf.EventService;
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


    @Override
    @Transactional(readOnly = true)
    public Page<EventDto> findByProject(Project project, Pageable pageable) {
        Page<Event> find = eventRepository.findByProject(project, pageable);
        return find.map(EventDto::new);
    }

    @Override
    @Transactional(readOnly = true)
    public EventDto findEventById(Long id) {
        Event find = eventRepository.findById(id).orElseThrow();
        return new EventDto(find);
    }

    @Override
    public EventDto saveEvent(EventDto dto) {
        Project project = projectRepository.findById(dto.getProjectId()).orElseThrow();

        Event add = new Event();
        add.setTitle(dto.getTitle());
        add.setDescription(dto.getDescription());
        add.setImage(dto.getImage());
        add.setDate(dto.getDate());
        add.setSeason(dto.getSeason());
        add.setStatus(dto.getStatus());
        add.setProject(project);

        if (add.getTitle() == null ||
                add.getImage() == null ||
                add.getStatus() == null ||
                add.getSeason() == null
        ) {
            add.setTitle("Evento " + (eventRepository.findByProject(project).size() + 1) + " do projeto " + add.getProject().getTitle());
            add.setImage("https://cdn0.iconfinder.com/data/icons/communcations-ono-system-core/30/event_available-1024.png");
            add.setStatus(Status.value("Indefinido"));
            add.setSeason(Season.value("Indefinido"));
        }

        return new EventDto(eventRepository.saveAndFlush(add));
    }

    @Override
    public EventDto updateEvent(EventDto dto) {
        Event edit = eventRepository.findById(dto.getId()).orElseThrow();

        edit.setId(edit.getId());
        edit.setTitle(dto.getTitle());
        edit.setDescription(dto.getDescription());
        edit.setImage(dto.getImage());
        edit.setDate(dto.getDate());
        edit.setSeason(dto.getSeason());
        edit.setStatus(dto.getStatus());

        return new EventDto(eventRepository.save(edit));
    }

    @Override
    public void deleteEvent(Long id) {
        this.eventRepository.deleteById(id);
    }
}
